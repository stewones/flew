import { merge, omit, isEmpty, isEqual, isArray, isObject } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { PartialObserver, Observable } from 'rxjs';

import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ExtraOptions } from '../interfaces/extra-options';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage-adapter';
import { Config } from '../symbols/rr';
import { SyncReactiveResponse } from '../utils/store';

export class PlatformBrowser extends ReactiveRecord {
  storage: StorageAdapter; // storage adapter (see ionic storage for instance)

  constructor(options: Options) {
    super(options);
    this.boot(options);
  }

  private boot(options) {
    if (!this.storage && options.useCache)
      throw new Error('missing storage instance');
    const newParams = <Options>{
      hook: {
        //
        // customize http behavior
        http: {
          post: {
            before: (key, observer, extraOptions) => {
              super.log().success()('hook.http.post.before');
              return this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              super.log().success()('hook.http.post.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          },
          patch: {
            before: (key, observer, extraOptions) => {
              super.log().success()('hook.http.patch.before');
              return this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              super.log().success()('hook.http.patch.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          },
          get: {
            before: async (key, observer, extraOptions) => {
              super.log().success()('hook.http.get.before');
              return await this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              super.log().success()('hook.http.get.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          }
        },
        //
        // customize search behavior
        find: {
          before: (key, observer, extraOptions) => {
            super.log().success()('hook.find.before');
            return this.getCache(key, observer, extraOptions);
          },
          after: async (key, network, observer, extraOptions) => {
            super.log().success()('hook.find.after');
            return this.setCache(key, network, observer, extraOptions);
          }
        }
      }
    };

    // merge(this, { ...options, ...newParams });
  }

  /**
   * get client cache
   *
   * @param {string} key
   * @param {PartialObserver<any>} observer
   * @param {ExtraOptions} [extraOptions={}]
   * @returns
   * @memberof ClientSetup
   */
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

  /**
   * set client cache
   *
   * @param {string} key
   * @param {(Response & { ttl: number })} network
   * @param {PartialObserver<any>} observer
   * @param {ExtraOptions} [extraOptions]
   * @memberof ClientSetup
   */
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

  clearCache(): void {
    this.storage.clear();
  }

  clearNetworkResponse(network) {
    return omit(network, [
      'config',
      'request',
      'response.config',
      'response.data',
      'response.request'
    ]);
  }

  feed() {
    const storage =
      !isEmpty(Config.options) && Config.options.storage
        ? Config.options.storage
        : false;
    const store = !isEmpty(Config.store) ? Config.store : false;

    if (store && storage) {
      storage.forEach((value, key, index) => {
        store.dispatch(new SyncReactiveResponse(value));
      });
    }
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
}
