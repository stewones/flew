import {
  FlewChainPayload,
  FlewOptions,
  FlewVerb,
  isDiff,
  namespace,
  publish,
} from '@flew/core';
import lodash from 'lodash';
const { isEmpty } = lodash;
import {
  from,
  Observable,
  of,
  catchError,
  first,
  map,
  mergeMap,
  tap,
  finalize,
} from 'rxjs';
import { FetchServer } from './server';

const workspace = namespace();
export class FetchBrowser extends FetchServer {
  constructor(options: FlewOptions) {
    super(options);
  }

  public get<T>(path = ''): Observable<T> {
    return this.call$('get', path);
  }

  public post<T>(path = '', body: any = {}): Observable<T> {
    return this.call$('post', path, body);
  }

  public patch<T>(path = '', body: any = {}): Observable<T> {
    return this.call$('patch', path, body);
  }

  public find<T>(): Observable<T> {
    return this.call$('find');
  }

  public findOne<T>(): Observable<T> {
    return this.call$('findOne');
  }

  public on<T>(options?: {
    find?: boolean;
    enter?: boolean;
    leave?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
    wsOpen?: any;
    wsClose?: any;
  }): Observable<T> {
    return this.call$<T>('on', null, options);
  }

  public count(): Observable<number> {
    return this.call$<number>('count');
  }

  public run<T>(name: string, payload: any): Observable<T> {
    return this.call$<T>('run', name, payload);
  }

  protected call$<T>(
    verb: FlewVerb,
    path = '',
    payload: any = {},
  ): Observable<T> {
    // get attributes
    const key = this.createKey(verb, path, payload);
    const chain = { ...this.chain };

    // reset to not mess the chain of subsequent calls
    this.reset();

    /**
     * order for response without repetition
     * 1 - state
     * 2 - cache
     * 3 - network
     */
    return new Observable<T>(observer => {
      this.getDataFromStateOrCache$<T>(key, chain)
        .pipe(
          first(),
          map(cache => {
            if (cache) {
              if (this.log().enabled()) {
                console.table(cache);
              }

              if (chain.useState) {
                this.setState(verb, key, chain, cache);
              }

              observer.next(cache);
              return cache;
            }
          }),
          mergeMap(cache => {
            return this.getDataFromNetwork$<T>(
              key,
              chain,
              path,
              verb,
              payload,
            ).pipe(
              tap(data => {
                // response based on network
                if (chain.response) {
                  chain.response(data);
                }

                // response based on data diff
                const isDifferent = chain.diff
                  ? chain.diff(cache, data)
                  : isDiff(cache, data);

                if (isDifferent) {
                  this.log().info()(`${key} using data from network`);

                  if (this.log().enabled()) {
                    console.table(data);
                  }

                  if (chain.useState) {
                    this.setState(verb, key, chain, data);
                  }
                  if (chain.useCache) {
                    this.setCache(verb, key, chain, data);
                  }
                  observer.next(data);
                }
              }),
              catchError(err => {
                observer.error(err);
                return of(err);
              }),
            );
          }),
        )
        .subscribe();
    }).pipe(
      finalize(() => {
        if (['on'].includes(verb)) {
          publish(`flew-livequery-subscription-${key}`);
        }
      }),
    );
  }

  protected getDataFromNetwork$<T>(key, chain, path, verb, payload) {
    if (chain.useNetwork) {
      if (!navigator.onLine) {
        this.log().danger()(`${key} navigator is offline`);
        return of();
      }

      return this.call<T>(verb, path, payload, chain, key);
    }

    this.log().danger()(`${key} network disabled`);
    return of();
  }

  protected async setCache(
    verb: FlewVerb,
    key: string,
    chain: FlewChainPayload,
    data: any,
  ): Promise<void> {
    if (!chain.useCache || !workspace.storage.enabled) return Promise.resolve();

    try {
      workspace.storage.set(key, data);
      this.log().warn()(`${key} cache updated`);
    } catch (err) {
      this.log().danger()(`${key} unable to save cache`);
      if (this.log().enabled()) {
        console.log(err);
      }
    }
  }

  protected setState(
    verb: FlewVerb,
    key: string,
    chain: FlewChainPayload,
    data: any,
  ): void {
    if (workspace.state.enabled && chain.useState) {
      try {
        const currentState = workspace.state.getState(key);
        if (isDiff(currentState, data)) {
          workspace.state.setState(key, data, { save: false });
          this.log().warn()(`${key} state updated`);
        }
      } catch (err) {
        this.log().danger()(`${key} unable to save state`);
        if (this.log().enabled()) {
          console.log(err);
        }
      }
    }
  }

  private getDataFromStateOrCache$<T>(key: string, chain): Observable<T> {
    const hasStore = workspace.state.enabled;
    const hasStorage = workspace.storage.enabled;

    const useState = chain.useState;
    const useCache = chain.useCache;

    if (!hasStore && !hasStorage) return of(null);

    const hasState = hasStore ? workspace.state.getState(key) : null;

    return !isEmpty(hasState) && useState
      ? of(hasState).pipe(
          first(),
          tap(it => {
            if (it) {
              this.log().info()(`${key} using data from state`);
            }
          }),
        )
      : hasStorage && useCache
      ? from(workspace.storage.get(key)).pipe(
          first(),
          tap(it => {
            if (it) {
              this.log().info()(`${key} using data from cache`);
            }
          }),
        )
      : of(null).pipe(first());
  }
}
