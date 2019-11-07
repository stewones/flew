// tslint:disable
import {
  isEmpty,
  isEqual,
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
import * as differential from '../utils/diff';
import { take } from 'rxjs/operators';

const deepDiff = differential.diff;

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
        this.log().warn()(`${key} [network$] request`);

        from(this.call<T>(verb, path, payload, chain, key))
          .pipe(take(1))
          .subscribe(
            response => {
              const networkData = cloneDeep(response);
              //
              // cache strategy
              let ttl = chain.ttl || 0;
              const seconds =
                  new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

              if (ttl > 0) {
                ttl += seconds;
                networkData.ttl = ttl;
              }
              this.dispatch(observer, networkData, chain);
              this.setCache(chain, key, networkData);

              if (!['on'].includes(verb)) {
                observer.complete();
              }
            },
            err => {
              observer.error(err);
              if (!['on'].includes(verb)) {
                observer.complete();
              }
            }
          );
      } else {
        this.log().danger()(
          `${key} network not allowed. probably because there's some ttl defined`
        );
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
    const state: Response = this.getState(key);

    if (useState && stateAvailable && !isEmpty(state.data)) return of();

    this.log().info()(`${key} return from cache? ${useCache ? true : false}`);

    if (useCache === false) return of();

    return from(
      Reative.storage
        .get(key)
        .then(cache => {
          // console.log(`cache`, cache);
          this.log().info()(
            `${key} cache available ? ${!isEmpty(cache) ? true : false}`
          );

          //
          // return cached response immediately to view
          if (cache && cache.data) this.dispatch(observer, cache, chain);
        })

        .catch(err => {
          this.log().warn()(err);
        })
    );
  }

  protected state$<T>(observer, chain, key) {
    const useState = chain.useState === false ? false : true;
    const stateAvailable = Reative.store.enabled;

    if (useState === false || !stateAvailable) return of();

    this.log().info()(`${key} use state? ${useState ? true : false}`);

    const state: Response = this.getState(key);

    this.log().info()(
      `${key} has state? ${!isEmpty(state.data) ? true : false}`
    );

    //
    // return cached response immediately to view
    // console.log(`state`, state);

    if (state && state.data) this.dispatch(observer, state, chain);

    return of();
  }

  protected isNetworkAllowed(chain: Chain, key: string): Promise<boolean> {
    return new Promise(async resolve => {
      //
      // check for TTL
      // should not call network
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
      let state: any = cloneDeep(this.getState(key)) || { data: {} };
      if (isEmpty(state.data)) {
        state = (await Reative.storage.get(key)) || { data: {} };
      }
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
    const networkData = network;
    let cacheData: Response & { ttl?: number } = {};
    if (!saveNetwork) return Promise.resolve();

    try {
      cacheData = await Reative.storage.get(key);
    } catch (err) {}

    if (this.isDifferent(chain, key, cacheData, networkData)) {
      Reative.storage.set(key, clearNetworkResponse(networkData));
      this.log().warn()(`${key} cache updated`);
    }
  }

  private isDifferent(chain, key, cache, network) {
    const _cache = cache && cache.data ? cache.data : null;
    const _network = network && network.data ? network.data : null;

    const isCustomDiff = isFunction(chain.diff);
    const diffFn = isCustomDiff
      ? chain.diff
      : (c, n) =>
          !isEqual(clearNetworkResponse(c), clearNetworkResponse(n)) ||
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
          deepDiff(clearNetworkResponse(_cache), clearNetworkResponse(_network))
        );
    }

    return diffFn(_cache, _network);
  }

  protected dispatch(
    observer = { next: data => {} },
    data: Response,
    chain: Chain
  ) {
    console.log(`dispatch`, data);
    const transformResponse: any = shouldTransformResponse(chain, data);
    observer.next(transformResponse(data));
    if (chain.useState || isUndefined(chain.useState)) Reative.store.sync(data);
  }

  private getState(key: string) {
    return Reative.store.get ? Reative.store.get(key) : { data: {} };
  }
}
