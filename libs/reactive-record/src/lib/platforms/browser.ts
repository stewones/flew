import { isEmpty, isEqual, isArray, isObject, merge } from 'lodash';
import { PartialObserver, Observable } from 'rxjs';
import { Options, Chain } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage';
import { Config } from '../symbols/rr';
import { ReactiveVerb } from '../interfaces/verb';
import { clearNetworkResponse } from '../utils/response';

export class PlatformBrowser extends ReactiveRecord {
  protected storage: StorageAdapter; // storage adapter (see ionic storage for reference)

  constructor(options: Options) {
    super(options);
    merge(this, options);
    if (!this.storage && options.useCache)
      throw new Error('missing storage instance');
  }

  public clearCache(): void {
    this.storage.clear();
  }

  // feed store with cached responses
  public feed() {
    const storage =
      !isEmpty(Config.options) && Config.options.storage
        ? Config.options.storage
        : false;

    if (storage) {
      storage.forEach((value, key, index) => {
        if (value.collection === this.collection) {
          Config.store.dispatch.next(value);
        }
      });
    }
  }

  public get<T extends Response>(path: string = ''): Observable<T> {
    return this.call('get', path);
  }

  public post<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.call('post', path, body);
  }

  public patch<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.call('patch', path, body);
  }

  public find<T extends Response>(): Observable<T> {
    return this.call('find');
  }

  public findOne<T extends Response>(): Observable<T> {
    return this.call('findOne');
  }

  protected call<T extends Response>(
    method: ReactiveVerb = 'get',
    path: string = '/',
    payload: any = {}
  ): Observable<T> {
    // initialize so we can have access to stuff like `storage`
    const currentDriver = super.getDriver();
    super.init({ driver: currentDriver });

    // stuff necessary for cache
    const key = super.createKey(path, payload);
    const chain = super.cloneChain();

    return new Observable((observer: PartialObserver<T>) => {
      this.shouldCallNetwork(key, chain).then(evaluation => {
        this.log().info()(
          `${key} [call] should request network? ${evaluation.now}`
        );
        if (evaluation.now) {
          super.call<T>(method, path, payload).subscribe(
            response => {
              this.setCache(key, response, observer, chain);
            },
            err => observer.error(err)
          );
        } else {
          super.log().danger()(
            `${key} [call] there is a cached response with time to live`
          );
          observer.next(evaluation.cache as T);
          observer.complete();
        }
      });

      //
      // return cached response
      this.shouldReturnCache(key, observer, chain);
    });
  }

  private shouldCallNetwork(
    key: string,
    chain: Chain = {}
  ): Promise<{ now: boolean; cache?: Response }> {
    return new Promise(async resolve => {
      const cache: Response & { ttl: number } | any = await this.storage.get(
        key
      );

      const useCache: boolean = chain.useCache === false ? false : true;
      const useNetwork: boolean = chain.useNetwork === false ? false : true;

      //
      // check for TTL
      // should not call network
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
      // console.log(`seconds`, seconds);

      //
      // avoid the return of any cache (jump to network request at server level)
      if (useCache === false && useNetwork !== false)
        return resolve({
          now: true
        });

      //
      // stop network request at server level
      if (useCache && (cache && seconds < cache.ttl) && !isEmpty(cache.data)) {
        return resolve({
          now: false,
          cache: cache
        });
      }

      return resolve({
        now: true
      });
    });
  }

  private async shouldReturnCache(
    key: string,
    observer: PartialObserver<any>,
    chain: Chain = {}
  ) {
    const cache: Response & { ttl: number } | any = await this.storage.get(key);
    let transformResponse: any =
      chain.transformResponse && typeof chain.transformResponse === 'function'
        ? chain.transformResponse
        : (data: Response) => data;
    if (chain.transformData) {
      transformResponse = (data: Response) => data.data;
    }
    const useCache: boolean = chain.useCache === false ? false : true;
    super.log().info()(`${key} [should] useCache? ${useCache ? true : false}`);
    super.log().info()(`${key} [should] hasCache? ${cache ? true : false}`);
    super.log().info()(
      `${key} [should] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );

    //
    // return cached response immediately to view
    if (
      (useCache && cache && !isEmpty(cache.data)) ||
      (useCache && isArray(cache) && !isEmpty(cache)) ||
      (useCache && isObject(cache) && !isEmpty(cache))
    ) {
      // console.log(`response from cache`, transformResponse(cache));
      observer.next(transformResponse(cache));
    }
  }

  private async setCache(
    key: string,
    network: Response & { ttl?: number },
    observer: PartialObserver<any>,
    chain: Chain = {}
  ) {
    const cache: Response & { ttl?: number } = await this.storage.get(key);
    const transformCache: any =
      chain.transformCache && typeof chain.transformCache === 'function'
        ? chain.transformCache
        : (data: Response) => data;

    let transformResponse: any =
      chain.transformResponse && typeof chain.transformResponse === 'function'
        ? chain.transformResponse
        : (data: Response) => data;

    if (chain.transformData) {
      transformResponse = (data: Response) => data.data;
    }

    const saveNetwork: boolean = chain.saveNetwork === false ? false : true;
    const useNetwork: boolean = chain.useNetwork === false ? false : true;

    super.log().info()(`${key} [set] hasCache? ${cache ? true : false}`);
    super.log().info()(
      `${key} [set] transformCache? ${
        chain.transformCache && typeof chain.transformCache === 'function'
          ? true
          : false
      }`
    );
    super.log().info()(
      `${key} [set] transformResponse? ${
        (chain.transformResponse &&
          typeof chain.transformResponse === 'function') ||
        chain.transformData
          ? true
          : false
      }`
    );
    super.log().info()(`${key} [set] useNetwork? ${useNetwork ? true : false}`);
    super.log().info()(
      `${key} [set] saveNetwork? ${saveNetwork ? true : false}`
    );

    //
    // defaults to return network response only if different from cache
    if (
      (cache && !isEqual(cache.data, network.data)) ||
      (cache && isEmpty(cache.data)) ||
      !cache ||
      isEmpty(network.data) ||
      useNetwork !== false
    ) {
      //
      // return network response
      observer.next(transformResponse(network));

      // dispatch to store
      if (network && network.data)
        Config.store.dispatch.next(clearNetworkResponse(network));
    }

    //
    // cache strategy
    if (saveNetwork) {
      let ttl = chain.ttl || 0;
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

      if (!isEqual(cache, network)) {
        super.log().warn()(`${key} [set] cache updated`);

        if (ttl > 0) {
          ttl += seconds;
          network.ttl = ttl;
        }

        //
        // set cache response
        this.storage.set(key, transformCache(clearNetworkResponse(network)));
      }
    }

    observer.complete();
  }
}
