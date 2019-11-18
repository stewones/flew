// tslint:disable
import {
  isEmpty,
  merge,
  isFunction,
  isBoolean,
  cloneDeep,
  isUndefined
} from 'lodash';
import { Observable, from, of, merge as merge$ } from 'rxjs';
import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { Records } from './server';
import { StorageAdapter } from '../interfaces/storage';
import { Reative } from '../symbols/reative';
import { ReativeVerb } from '../interfaces/verb';
import {
  clearNetworkResponse,
  shouldTransformResponse
} from '../utils/response';
import { Chain } from '../interfaces/chain';
import { take } from 'rxjs/operators';
import { diff } from '../utils/diff';

export class PlatformBrowser extends Records {
  /**
   * Storage Adapter
   * see ionic storage for reference
   * https://github.com/ionic-team/ionic-storage/blob/master/src/storage.ts
   */
  protected _storage: StorageAdapter;

  constructor(options: Options) {
    super(options);
    merge(this, this.clearOptions(options));
  }

  /**
   * Clear browser cache
   * @deprecated
   * import the pure function `resetCache`
   * from cache package
   */
  public clearCache(): void {
    this.init({ driver: this.getDriver() });
    Reative.storage.clear();
    Reative.store.reset();
  }

  public feed() {
    const storage =
      !isEmpty(Reative.options) && Reative.storage ? Reative.storage : false;
    if (storage) {
      storage.forEach((value, key, index) => {
        if (value.collection === this.collection) {
          Reative.store.sync(value);
        }
      });
    }
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

  protected call$<T>(
    verb: ReativeVerb,
    path: string = '',
    payload: any = {}
  ): Observable<T> {
    //
    // get attributes
    const key = this.createKey(verb, path, payload);
    const chain = this.cloneChain();
    const driver = this.getDriver();

    //
    // set default attr
    if (!isBoolean(chain.transformData)) chain.transformData = true;

    //
    // reset chain for subsequent calls
    this.reset();

    //
    // re-init so we can have access to stuff like `storage`
    this.init({
      driver: driver
    });

    //
    // order for response
    //
    // 1 - state
    // 2 - cache
    // 3 - network
    //
    // check for ttl condition, when met it should
    // only return the response from (state or cache)
    // rather than request network
    //
    return new Observable(observer => {
      merge$(
        this.state$(observer, chain, key).pipe(take(1)),
        this.cache$(observer, chain, key).pipe(take(1)),
        this.network$(observer, verb, path, payload, chain, key).pipe(take(1))
      )
        .pipe(take(2))
        .subscribe();
    });
  }

  protected network$<T>(observer, verb, path, payload, chain, key) {
    this.isNetworkAllowed(chain, key).then(allowed => {
      // console.log(`is network allowed?`, allowed);
      if (allowed) {
        this.log().warn()(`${key} network$ request`);
        from(this.call<T>(verb, path, payload, chain, key)).subscribe(
          response => {
            this.getCurrentState$(key).subscribe((stateData: Response) => {
              const networkData: Response = cloneDeep(response);
              if (this.isDifferent(chain, key, stateData, networkData)) {
                //
                // cache strategy
                let ttl = chain.ttl || 0;

                if (ttl > 0) {
                  // increase seconds
                  ttl += new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
                  networkData.ttl = ttl;
                }

                this.dispatch(observer, networkData, chain);
                this.setCache(chain, key, networkData);

                this.log().info()(`${key} dispatch from network$`);
              }

              if (!['on'].includes(verb)) {
                observer.complete();
              }
            });
          },
          err => {
            observer.error(err);
            if (!['on'].includes(verb)) {
              observer.complete();
            }
          }
        );
      } else {
        this.log().danger()(`${key} network not allowed. ttl condition met.`);
        if (!['on'].includes(verb)) {
          observer.complete();
        }
      }
    });
    return of();
  }

  protected cache$<T>(observer, chain, key) {
    const useCache: boolean = chain.useCache === false ? false : true;
    const useState: boolean = chain.useState === false ? false : true;
    const stateAvailable = Reative.store.enabled;
    const cacheAvailable = isFunction(Reative.storage.get);
    const state: Response = this.getCurrentState(key);

    if ((useState && stateAvailable && !isEmpty(state.data)) || !cacheAvailable)
      return of();

    if (useCache === false) return of();

    return from(
      Reative.storage
        .get(key)
        .then(cache => {
          //
          // return cached response immediately to view
          if (cache && cache.data) {
            this.dispatch(observer, cache, chain);
            this.log().info()(`${key} dispatch from cache$`);
          }
        })
        .catch(err => {
          this.log().warn()(err);
        })
    );
  }

  protected state$<T>(observer, chain, key) {
    const useState = chain.useState === false ? false : true;
    const hasState = Reative.store.enabled;

    if (useState === false || !hasState) return of();

    const state: Response = this.getCurrentState(key);

    //
    // return cached response immediately to view
    // console.log(`state`, state);
    if (state && state.data) {
      this.dispatch(observer, state, chain);
      this.log().info()(`${key} dispatch from state$`);
    }
    return of();
  }

  protected isNetworkAllowed(chain: Chain, key: string): Promise<boolean> {
    return new Promise(async resolve => {
      //
      // check for TTL
      // should not call network
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
      let state: Response = cloneDeep(
        await this.getCurrentState$(key).toPromise()
      ) || { data: {} };

      if (!state.ttl) state.ttl = 0;
      if (!chain.ttl) chain.ttl = 0;

      const hasState = state && !isEmpty(state.data) ? true : false;
      // console.log(key, hasState, seconds, state.ttl, chain.ttl);

      if (hasState && seconds < state.ttl && chain.ttl > 0) {
        return resolve(false);
      }

      return resolve(true);
    });
  }

  protected async setCache(
    chain: Chain,
    key: string,
    network: Response & { ttl?: number }
  ): Promise<void> {
    const saveNetwork: boolean = chain.saveNetwork === false ? false : true;
    const hasStorage = Reative.storage && isFunction(Reative.storage.get);
    if (!saveNetwork || !hasStorage) return Promise.resolve();
    try {
      Reative.storage.set(key, clearNetworkResponse(network));
      this.log().warn()(`${key} cache updated`);
    } catch (err) {
      this.log().danger()(`${key} unable to save cache`);
      if (this.log().enabled()) {
        console.log(err);
      }
    }
  }

  private isDifferent(chain, key, cache, network) {
    const _cache = cache && cache.data ? cache.data : null;
    const _network = network && network.data ? network.data : null;

    const isCustomDiff = isFunction(chain.diff);
    const diffFn = isCustomDiff
      ? chain.diff
      : (c, n) =>
          !isEmpty(diff(clearNetworkResponse(c), clearNetworkResponse(n))) ||
          isEmpty(_cache) ||
          isEmpty(_network);

    if (isCustomDiff) {
      this.log().danger()(`${key} [diff] applying a custom function`);
      this.log().danger()(
        `${key} [diff] network data is different from cache? ${diffFn(
          _cache,
          _network
        )}`
      );
      if (this.log().enabled())
        console.log(
          `${key} [diff] deep data difference between them`,
          diff(clearNetworkResponse(_cache), clearNetworkResponse(_network))
        );
    }

    return diffFn(_cache, _network);
  }

  protected dispatch(
    observer = { next: data => {} },
    data: Response,
    chain: Chain
  ) {
    // console.log(`dispatch`, data);
    const transformResponse: any = shouldTransformResponse(chain, data);
    observer.next(transformResponse(data));
    if (chain.useState || isUndefined(chain.useState)) Reative.store.sync(data);
  }

  private getCurrentState(key: string): Response {
    const hasStore = Reative.store && isFunction(Reative.store.get);
    if (!hasStore) return null;
    const state = hasStore ? Reative.store.get(key) : null;
    return state;
  }

  private getCurrentState$(key: string): Observable<Response> {
    const hasStore = Reative.store && isFunction(Reative.store.get);
    const hasStorage = Reative.storage && isFunction(Reative.storage.get);

    if (!hasStore && !hasStorage) return of();

    const state: Response = hasStore ? Reative.store.get(key) : null;

    return !isEmpty(state)
      ? of(state)
      : hasStorage
      ? (from(
          new Promise((resolve, reject) => {
            Reative.storage
              .get(key)
              .then(r => resolve(r as Observable<Response>))
              .catch(err => reject(err));
          })
        ) as Observable<Response>)
      : of();
  }
}
