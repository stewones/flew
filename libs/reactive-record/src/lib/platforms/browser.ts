import { omit, isEmpty, isEqual, isArray, isObject, merge } from 'lodash';
import { PartialObserver, Observable } from 'rxjs';
import { Options, ExtraOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage';
import { Config } from '../symbols/rr';
import { SyncReactiveResponse } from '../utils/store';

export class PlatformBrowser extends ReactiveRecord {
  storage: StorageAdapter; // storage adapter (see ionic storage for instance)

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
    return this.httpRequest('get', path);
  }

  public post<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.httpRequest('post', path, body);
  }

  public patch<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.httpRequest('patch', path, body);
  }

  public delete<T extends Response>(
    path: string = '',
    body?: any
  ): Observable<T> {
    return this.httpRequest('delete', path, body);
  }

  public find<T extends Response>(): Observable<T> {
    return this.fireRequest<T>('find');
  }

  public findOne<T extends Response>(): Observable<T> {
    return this.fireRequest<T>('findOne');
  }

  private fireRequest<T extends Response>(method: 'find' | 'findOne' = 'find') {
    super.init();
    return new Observable((observer: PartialObserver<T>) => {
      const key = super.createFireKey();
      const extraOptions = super.cloneExtraOptions();
      this.getCache(key, observer, extraOptions).then(shouldRequestNetwork => {
        this.log().success()(
          `should it request network? ${shouldRequestNetwork}`
        );
        if (shouldRequestNetwork) {
          super[method]().subscribe(response => {
            this.setCache(key, response, observer, extraOptions);
          }, observer.error);
        } else {
          super.log().warn()(
            `${key} - there is a cached response with time to live`
          );
          observer.complete();
        }
      });
    });
  }

  private httpRequest<T extends Response>(
    method: 'get' | 'post' | 'patch' | 'delete' = 'get',
    path: string = '/',
    body?: any
  ): Observable<T> {
    super.init();
    return new Observable((observer: PartialObserver<T>) => {
      const key = super.createKey(path);
      const extraOptions = super.cloneExtraOptions();
      this.getCache(key, observer, extraOptions).then(shouldRequestNetwork => {
        this.log().success()(
          `should it request network? ${shouldRequestNetwork}`
        );
        if (shouldRequestNetwork) {
          //
          // network handle
          switch (method) {
            case 'post':
              return super.post(path, body).subscribe(response => {
                this.setCache(key, response, observer, extraOptions);
              }, observer.error);
              break;

            case 'patch':
              super.patch(path, body).subscribe(response => {
                this.setCache(key, response, observer, extraOptions);
              }, observer.error);
              break;

            case 'delete':
              super.delete(path, body).subscribe(response => {
                this.setCache(key, response, observer, extraOptions);
              }, observer.error);
              break;

            default:
              super.get(path).subscribe(response => {
                this.setCache(key, response, observer, extraOptions);
              }, observer.error);
          }
        } else {
          super.log().warn()(
            `${key} - there is a cached response with time to live`
          );
          observer.complete();
        }
      });
    });
  }

  private async getCache(
    key: string,
    observer: PartialObserver<any>,
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl: number } | any = await this.storage.get(key);
    const transformResponse: any =
      extraOptions.transformResponse &&
      typeof extraOptions.transformResponse === 'function'
        ? extraOptions.transformResponse
        : (data: Response) => data;

    const useCache: boolean = extraOptions.useCache === false ? false : true;
    const useNetwork: boolean =
      extraOptions.useNetwork === false ? false : true;

    super.log().warn()(`${key} useNetwork? ${useNetwork ? true : false}`);
    super.log().warn()(`${key} useCache? ${useCache ? true : false}`);
    super.log().warn()(`${key} hasCache? ${cache ? true : false}`);
    super.log().warn()(
      `${key} transformResponse? ${
        extraOptions.transformResponse &&
        typeof extraOptions.transformResponse === 'function'
          ? true
          : false
      }`
    );

    //
    // avoid the return of any cache (jump to network request at server level)
    if (useCache === false && useNetwork !== false) return true;

    //
    // return cached response immediately to view
    if (
      (useCache && cache && !isEmpty(cache.data)) ||
      (useCache && isArray(cache) && !isEmpty(cache)) ||
      (useCache && isObject(cache) && !isEmpty(cache))
    ) {
      observer.next(transformResponse(cache));
    }

    //
    // check for TTL
    // should not call network
    const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
    // console.log(`seconds`, seconds);

    //
    // stop network request at server level
    if (useCache && (cache && seconds < cache.ttl) && !isEmpty(cache.data)) {
      observer.complete();
      return false;
    }

    //
    // should use network?
    if (useNetwork) return true;

    //
    // otherwise
    return false;
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
    const transformResponse: any =
      extraOptions.transformResponse &&
      typeof extraOptions.transformResponse === 'function'
        ? extraOptions.transformResponse
        : (data: Response) => data;
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
        extraOptions.transformResponse &&
        typeof extraOptions.transformResponse === 'function'
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
      useNetwork !== false
    ) {
      //
      // return network response
      observer.next(transformResponse(network));
      //
      // dispatch to store
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
        (isEmpty(network.data) && cache) ||
        isEmpty(cache) ||
        (cache && seconds >= cache.ttl)
      ) {
        super.log().danger()(`${key} cache updated`);
      }

      //
      // set cache response
      ttl += seconds;
      network.ttl = ttl;
      this.storage.set(key, transformCache(this.clearNetworkResponse(network)));
    }

    // console.log('useNetwork?', extraOptions.useNetwork);
    observer.complete();
  }
}
