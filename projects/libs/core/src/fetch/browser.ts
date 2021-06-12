import { isEmpty } from 'lodash';
import { from, Observable, of } from 'rxjs';
import { catchError, first, map, mergeMap, tap } from 'rxjs/operators';
import { isDiff } from '../effects/diff';
import { RebasedChainPayload } from '../interfaces/chain';
import { RebasedOptions } from '../interfaces/options';
import { RebasedVerb } from '../interfaces/verb';
import { Rebased } from '../symbols/rebased';
import { FetchServer } from './server';

export class FetchBrowser extends FetchServer {
  constructor(options: RebasedOptions) {
    super(options);
  }

  public get<T>(path: string = ''): Observable<T> {
    return this.call$('get', path);
  }

  public post<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call$('post', path, body);
  }

  public patch<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call$('patch', path, body);
  }

  public find<T>(): Observable<T> {
    return this.call$('find');
  }

  public findOne<T>(): Observable<T> {
    return this.call$('findOne');
  }

  public on<T>(): Observable<T> {
    return this.call$<T>('on');
  }

  public count(): Observable<number> {
    return this.call$<number>('count');
  }

  public run<T>(name: string, payload: any): Observable<T> {
    return this.call$<T>('run', name, payload);
  }

  protected call$<T>(
    verb: RebasedVerb,
    path: string = '',
    payload: any = {}
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
    return new Observable(observer => {
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
              payload
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

                if (!['on'].includes(verb)) {
                  observer.complete();
                }

                this.log().warn()(`${key} network request end`);
              }),
              catchError(err => {
                observer.error(err);
                return of(err);
              })
            );
          })
        )
        .subscribe();
    });
  }

  protected getDataFromNetwork$<T>(key, chain, path, verb, payload) {
    if (chain.useNetwork) {
      this.log().warn()(`${key} network request start`);
      return from(this.call<T>(verb, path, payload, chain, key)).pipe(
        !['on'].includes(verb) ? first() : tap()
      );
    }

    this.log().danger()(`${key} network disabled`);
    return of() as Observable<T>;
  }

  protected async setCache(
    verb: RebasedVerb,
    key: string,
    chain: RebasedChainPayload,
    data: any
  ): Promise<void> {
    if (!chain.useCache || !Rebased.storage.enabled) return Promise.resolve();

    try {
      Rebased.storage.set(key, data);
      this.log().warn()(`${key} cache updated`);
    } catch (err) {
      this.log().danger()(`${key} unable to save cache`);
      if (this.log().enabled()) {
        console.log(err);
      }
    }
  }

  protected setState(
    verb: RebasedVerb,
    key: string,
    chain: RebasedChainPayload,
    data: any
  ): void {
    if (Rebased.state.enabled && chain.useState) {
      try {
        const currentState = Rebased.state.getState(key);
        if (isDiff(currentState, data)) {
          Rebased.state.setState(key, data, { save: false });
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
    const hasStore = Rebased.state.enabled;
    const hasStorage = Rebased.storage.enabled;

    const useState = chain.useState;
    const useCache = chain.useCache;

    if (!hasStore && !hasStorage) return of(null);

    const hasState = hasStore ? Rebased.state.getState(key) : null;

    return !isEmpty(hasState) && useState
      ? of(hasState).pipe(
          first(),
          tap(it => {
            if (it) {
              this.log().info()(`${key} using data from state`);
            }
          })
        )
      : hasStorage && useCache
      ? from(Rebased.storage.get(key)).pipe(
          first(),
          tap(it => {
            if (it) {
              this.log().info()(`${key} using data from cache`);
            }
          })
        )
      : of(null).pipe(first());
  }
}
