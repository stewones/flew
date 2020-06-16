import { isBoolean, isEmpty, isEqual } from 'lodash';
import { from, Observable, of, concat } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { RebasedChainPayload } from '../interfaces/chain';
import { RebasedOptions } from '../interfaces/options';
import { RebasedVerb } from '../interfaces/verb';
import { Rebased } from '../symbols/rebased';
import { PlatformServer } from './server';

export class PlatformBrowser extends PlatformServer {
  _memo_cache;
  _memo_network;

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
      concat(
        this.stateCache$(observer, chain, key),
        this.network$(observer, verb, path, payload, chain, key)
      )
        .pipe(
          // ensure that we'll have at most two responses
          take(2)
        )
        .subscribe();
    });
  }

  protected network$<T>(observer, verb, path, payload, chain, key) {
    if (chain.useNetwork) {
      this.log().warn()(`${key} network request start`);
      from(this.call<T>(verb, path, payload, chain, key)).subscribe(
        response => {
          if (!isEqual(this._memo_cache, response)) {
            this.log().info()(`${key} dispatch from network`);
            if (this.log().enabled()) {
              console.table(response);
            }
            this._memo_network = response;
            this.dispatch(chain, key, response, observer);
            this.setCache(chain, key, response);
          }
          if (!['on'].includes(verb)) {
            observer.complete();
          }
          this.log().warn()(`${key} network request end`);
        },
        err => {
          observer.error(err);
          if (!['on'].includes(verb)) {
            observer.complete();
          }
        }
      );
    } else {
      this.log().danger()(`${key} network disabled`);
      if (!chain.useMemo && !chain.useCache) {
        observer.next();
        observer.complete();
      }
    }
    return of();
  }

  protected stateCache$<T>(observer, chain, key) {
    const hasState = Rebased.state.enabled;
    const hasStorage = Rebased.storage.enabled;

    if (!hasState || !hasStorage) {
      return of();
    }

    return this.getDataFromStateOrCache$(key, chain).pipe(
      take(1),
      tap(payload => {
        if (payload.data && !this._memo_network) {
          this._memo_cache = payload.data;
          this.dispatch(chain, key, payload.data, observer);
          this.log().info()(`${key} dispatch from ${payload.from}`);
          if (this.log().enabled()) {
            console.table(payload.data);
          }
        }
      })
    );
  }

  protected async setCache(
    chain: RebasedChainPayload,
    key: string,
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

  protected dispatch(
    chain: RebasedChainPayload,
    key: string,
    data: any,
    observer = { next: data => {} }
  ) {
    observer.next(data);

    if (Rebased.state.enabled && chain.useMemo) {
      const currentState = Rebased.state.getState(key);
      if (!isEqual(currentState, data)) {
        Rebased.state.setMemo(key, data, { save: false });
      }
    }
  }

  private getDataFromStateOrCache$(
    key: string,
    chain
  ): Observable<{ from: 'memo' | 'cache'; data: any }> {
    const hasStore = Rebased.state.enabled;
    const hasStorage = Rebased.storage.enabled;

    const useMemo = chain.useMemo;
    const useCache = chain.useCache;

    if (!hasStore && !hasStorage) return of();

    const hasState = hasStore ? Rebased.state.getState(key) : null;

    return !isEmpty(hasState) && useMemo
      ? of({ from: 'memo', data: hasState })
      : hasStorage && useCache
      ? (from(
          Rebased.storage.get(key).then(it => {
            return {
              from: 'cache',
              data: it
            };
          })
        ) as Observable<any>)
      : of();
  }
}
