// tslint:disable
import { isEmpty, isEqual, merge, isFunction, isBoolean } from 'lodash';
import { Observable, from, of, merge as merge$ } from 'rxjs';
import { map, switchMap, filter, catchError, tap } from 'rxjs/operators';
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
    this.$storage().clear();
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
    // request
    return new Observable(observer => {
      this.shouldCallNetwork(chain, key).then(evaluation =>
        merge$(
          this.state$(observer, chain, key),
          this.cache$(observer, chain, key),
          this.ttl$(evaluation, observer, chain, key),
          this.network$(evaluation, observer, verb, path, payload, chain, key)
        ).subscribe()
      );
    });
  }

  protected network$<T>(evaluation, observer, verb, path, payload, chain, key) {
    return of(evaluation).pipe(
      filter(evaluation => evaluation.now === true),
      tap(() => this.log().warn()(`${key} [network$] request`)),
      switchMap(() =>
        from(this.call<T>(verb, path, payload, chain, key)).pipe(
          tap(response => this.setCache(verb, chain, key, response, observer)),
          catchError(err => observer.error(err))
        )
      )
    );
  }

  protected ttl$<T>(evaluation, observer, chain, key) {
    return of(evaluation).pipe(
      map(evaluation => {
        if (!evaluation.now) {
          if (evaluation.ttl) {
            this.log().danger()(`${key} [ttl$] response`);
          }
          this.dispatch(observer, evaluation.cache, chain);
          observer.complete();
        }
      })
    );
  }

  protected cache$<T>(observer, chain, key) {
    return from(this.shouldReturnCache(chain, key, observer));
  }

  protected state$<T>(observer, chain, key) {
    return from(this.shouldReturnState(chain, key, observer));
  }

  protected shouldCallNetwork(
    chain: Chain,
    key: string
  ): Promise<{ now: boolean; cache?: Response; ttl?: boolean }> {
    return new Promise(async resolve => {
      const useCache: boolean = chain.useCache === false ? false : true;
      const useState: boolean = chain.useState === false ? false : true;
      const useNetwork: boolean = chain.useNetwork === false ? false : true;

      //
      // check for TTL
      // should not call network
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
      let state: any = this.$state(key) || { data: {} };
      if (isEmpty(state.data)) {
        state = (await this.$storage().get(key)) || { data: {} };
      }
      const hasState = state && !isEmpty(state.data) ? true : false;
      //
      // avoid the return of any cache (jump to network request at server level)
      if ((useCache === false || useState === false) && useNetwork !== false)
        return resolve({
          now: true
        });

      //
      // stop network request at server level - case 1
      if ((useCache || useState) && hasState && useNetwork === false) {
        this.log().info()(`${key} [shouldCallNetwork] stop request`);
        return resolve({
          now: false,
          cache: state
        });
      }

      //
      // stop network request at server level - case 2
      if (
        (useCache || useState) &&
        (hasState && seconds < state.ttl) &&
        chain.ttl > 0
      ) {
        this.log().info()(`${key} [shouldCallNetwork] stop request due to TTL`);

        return resolve({
          now: false,
          ttl: true,
          cache: state
        });
      }

      return resolve({
        now: true
      });
    });
  }

  protected async shouldReturnCache(chain: Chain, key: string, observer) {
    const useCache: boolean = chain.useCache === false ? false : true;
    const useState: boolean = chain.useState === false ? false : true;
    const stateAvailable = Reative.store.enabled;
    const state: Response = this.$state(key);

    if (useState && stateAvailable && !isEmpty(state)) return Promise.resolve();

    this.log().info()(
      `${key} [shouldReturnCache] useCache? ${useCache ? true : false}`
    );

    if (useCache === false) return Promise.resolve();

    const cache: Response & { ttl: number } | any = await this.$storage().get(
      key
    );

    this.log().info()(
      `${key} [shouldReturnCache] hasCache? ${!isEmpty(cache) ? true : false}`
    );

    this.log().info()(
      `${key} [shouldReturnCache] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );

    //
    // return cached response immediately to view
    if (useCache && !isEmpty(cache)) {
      this.dispatch(observer, cache, chain);
    }
  }

  protected async shouldReturnState(chain: Chain, key: string, observer) {
    const useState = chain.useState === false ? false : true;
    const stateAvailable = Reative.store.enabled;

    if (useState === false || !stateAvailable) return Promise.resolve();

    this.log().info()(
      `${key} [shouldReturnState] useState? ${useState ? true : false}`
    );

    const state: Response = this.$state(key);

    this.log().info()(
      `${key} [shouldReturnState] hasState? ${!isEmpty(state) ? true : false}`
    );
    this.log().info()(
      `${key} [shouldReturnState] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );

    //
    // return cached response immediately to view
    if (useState && !isEmpty(state)) {
      this.dispatch(observer, state, chain);
    }
  }

  protected async setCache(
    verb: ReativeVerb,
    chain: Chain,
    key: string,
    network: Response & { ttl?: number },
    observer = { next: data => {}, complete: () => {} }
  ) {
    const saveNetwork: boolean = chain.saveNetwork === false ? false : true;
    const useNetwork: boolean = chain.useNetwork === false ? false : true;
    const useCache: boolean = chain.useCache === false ? false : true;

    //
    // should return response immediately
    if (useNetwork === true && useCache === false) {
      this.log().warn()(`${key} [setCache] response`);
      this.dispatch(observer, network, chain);
    }

    let cache: Response & { ttl?: number } = {};

    try {
      cache = await this.$storage().get(key);
    } catch (err) {}

    //
    // cache strategy
    let ttl = chain.ttl || 0;
    const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

    if (ttl > 0) {
      ttl += seconds;
      network.ttl = ttl;
    }

    if (this.isDifferent(chain, key, cache, network)) {
      this.log().info()(
        `${key} [setCache] saveNetwork? ${saveNetwork ? true : false}`
      );

      if (saveNetwork) {
        this.$storage().set(key, clearNetworkResponse(network));
        this.log().warn()(`${key} [setCache] cache updated`);
      }

      //
      // return network response\
      if (
        (useNetwork === true && useCache === true) ||
        (useNetwork === false && useCache === true)
      ) {
        this.log().danger()(
          `${key} [setCache] response [cache might be outdated]`
        );
        this.dispatch(observer, network, chain);
      }
    } else {
      //
      // edge case: update cache because of ttl
      if (chain.ttl && cache && !cache.ttl) {
        if (saveNetwork) {
          this.$storage().set(key, clearNetworkResponse(network));
          this.log().warn()(`${key} [setCache] cache updated [ttl]`);
          Reative.store.sync(network);
        }
      }
    }
    if (!['on'].includes(verb)) return observer.complete();
  }

  private isDifferent(chain, key, cache, network) {
    const _cache = cache && cache.data ? cache.data : null;
    const _network = network && network.data ? network.data : null;

    const isCustomDiff = isFunction(chain.diff);
    const diffFn = isCustomDiff
      ? chain.diff
      : (c, n) => !isEqual(clearNetworkResponse(c), clearNetworkResponse(n));

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

    return isCustomDiff
      ? diffFn(_cache, _network)
      : diffFn(_cache, _network) || (isEmpty(_cache) || isEmpty(_network));
  }

  protected dispatch(observer = { next: data => {} }, data, chain) {
    const transformResponse: any = shouldTransformResponse(chain, data);
    observer.next(transformResponse(data));
    Reative.store.sync(data);
  }

  protected $storage(): any {
    return Reative.storage;
  }

  private $state(key: string) {
    return Reative.store.get ? Reative.store.get(key) : { data: {} };
  }
}
