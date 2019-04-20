import { omit, isEmpty, isEqual, isArray, isObject, merge } from 'lodash';
import { PartialObserver, Observable } from 'rxjs';
import { Options, ExtraOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage';
import { Config } from '../symbols/rr';
import { SyncReactiveResponse } from '../utils/store';
import { ReactiveVerb } from '../interfaces/verb';

export class PlatformBrowser extends ReactiveRecord {
  protected storage: StorageAdapter; // storage adapter (see ionic storage for instance)

  constructor(options: Options) {
    super(options);
    merge(this, options);
    if (!this.storage && options.useCache)
      throw new Error('missing storage instance');
  }

  public clearCache(): void {
    this.storage.clear();
  }

  public clearNetworkResponse(network) {
    return omit(network, [
      'config',
      'request',
      'response.config',
      'response.data',
      'response.request'
    ]);
  }

  // feed store with cached responses
  public feed() {
    const storage =
      !isEmpty(Config.options) && Config.options.storage
        ? Config.options.storage
        : false;
    const store = !isEmpty(Config.store) ? Config.store : false;

    if (store && storage) {
      storage.forEach((value, key, index) => {
        if (value.collection === this.collection)
          store.dispatch(new SyncReactiveResponse(value));
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
    const extraOptions = super.cloneExtraOptions();

    return new Observable((observer: PartialObserver<T>) => {
      this.shouldRequestNetwork(key, extraOptions).then(
        shouldRequestNetwork => {
          this.log().success()(
            `${key} should request network? ${shouldRequestNetwork}`
          );
          if (shouldRequestNetwork) {
            super.call<T>(method, path, payload).subscribe(
              response => {
                this.setCache(key, response, observer, extraOptions);
              },
              err => observer.error(err)
            );
          } else {
            super.log().danger()(
              `${key} - there is a cached response with time to live. try to adjust the *ttl* property or remove the cache completely.`
            );
            observer.complete();
          }
        }
      );
      //
      // return cached response
      this.shouldReturnCache(key, observer, extraOptions);
    });
  }

  private async shouldRequestNetwork(
    key: string,
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl: number } | any = await this.storage.get(key);

    const useCache: boolean = extraOptions.useCache === false ? false : true;
    const useNetwork: boolean =
      extraOptions.useNetwork === false ? false : true;

    //
    // check for TTL
    // should not call network
    const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
    // console.log(`seconds`, seconds);

    //
    // avoid the return of any cache (jump to network request at server level)
    if (useCache === false && useNetwork !== false) return true;

    //
    // stop network request at server level
    if (useCache && (cache && seconds < cache.ttl) && !isEmpty(cache.data)) {
      return false;
    }

    return true;
  }

  private async shouldReturnCache(
    key: string,
    observer: PartialObserver<any>,
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl: number } | any = await this.storage.get(key);
    let transformResponse: any =
      extraOptions.transformResponse &&
      typeof extraOptions.transformResponse === 'function'
        ? extraOptions.transformResponse
        : (data: Response) => data;
    if (extraOptions.transformData) {
      transformResponse = (data: Response) => data.data;
    }
    const useCache: boolean = extraOptions.useCache === false ? false : true;
    const useNetwork: boolean =
      extraOptions.useNetwork === false ? false : true;
    super.log().warn()(`${key} useNetwork? ${useNetwork ? true : false}`);
    super.log().warn()(`${key} useCache? ${useCache ? true : false}`);
    super.log().warn()(`${key} hasCache? ${cache ? true : false}`);
    super.log().warn()(
      `${key} transformResponse? ${
        (extraOptions.transformResponse &&
          typeof extraOptions.transformResponse === 'function') ||
        extraOptions.transformData
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
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl?: number } = await this.storage.get(key);
    const transformCache: any =
      extraOptions.transformCache &&
      typeof extraOptions.transformCache === 'function'
        ? extraOptions.transformCache
        : (data: Response) => data;

    let transformResponse: any =
      extraOptions.transformResponse &&
      typeof extraOptions.transformResponse === 'function'
        ? extraOptions.transformResponse
        : (data: Response) => data;

    if (extraOptions.transformData) {
      transformResponse = (data: Response) => data.data;
    }

    const saveNetwork: boolean =
      extraOptions.saveNetwork === false ? false : true;
    const useNetwork: boolean =
      extraOptions.useNetwork === false ? false : true;

    super.log().warn()(`${key} hasCache? ${cache ? true : false}`);
    super.log().warn()(
      `${key} transformCache? ${
        extraOptions.transformCache &&
        typeof extraOptions.transformCache === 'function'
          ? true
          : false
      }`
    );
    super.log().warn()(
      `${key} transformResponse? ${
        (extraOptions.transformResponse &&
          typeof extraOptions.transformResponse === 'function') ||
        extraOptions.transformData
          ? true
          : false
      }`
    );
    super.log().warn()(`${key} useNetwork? ${useNetwork ? true : false}`);
    super.log().warn()(`${key} saveNetwork? ${saveNetwork ? true : false}`);

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
        Config.store.dispatch(
          new SyncReactiveResponse(this.clearNetworkResponse(network))
        );
    }

    //
    // time to live
    const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
    if (saveNetwork) {
      let ttl = extraOptions.ttl /*|| this.ttl*/ || 0;

      if (
        (isEmpty(network.data) && !isEmpty(cache)) ||
        (isEmpty(cache) && !isEmpty(network.data)) ||
        (!isEmpty(cache) && seconds >= cache.ttl)
      ) {
        super.log().danger()(`${key} cache updated`);
        //
        // set cache response
        ttl += seconds;
        network.ttl = ttl;

        this.storage.set(
          key,
          transformCache(this.clearNetworkResponse(network))
        );
      }
    }

    observer.complete();
  }
}
