import { merge, omit, isEmpty, isEqual, isArray } from 'lodash';
import { AxiosRequestConfig, AxiosBasicCredentials } from 'axios';
import { PartialObserver } from 'rxjs';

import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ExtraOptions } from '../interfaces/extra-options';
import { ReactiveRecord } from './server';
import { StorageAdapter } from '../interfaces/storage-adapter';
import { ClientToken } from '../interfaces/client-token';
import { isObject } from 'util';

export class PlatformBrowser extends ReactiveRecord {
  version: string; // 'accept-version' to http headers
  auth: AxiosBasicCredentials;
  token: ClientToken; // 'Authorization' token to http headers
  storage: StorageAdapter; // storage adapter

  constructor(options: Options) {
    super(options);
    this.init(options);
  }

  private init(options) {
    if (!this.storage && options.useCache)
      throw new Error('missing storage instance');

    const newParams = <Options>{
      hook: {
        //
        // customize http behavior
        http: {
          pre: (config: AxiosRequestConfig) => {
            if (this.token && this.token.value)
              config.headers['Authorization'] = `${this.token.type} ${
                this.token.value
              }`;
            if (this.version) config.headers['accept-version'] = this.version;

            if (this.auth) config.auth = this.auth;
          },
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

    merge(this, { ...options, ...newParams });
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
    network: Response & { ttl: number },
    observer: PartialObserver<any>,
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl: number } = await this.storage.get(key);
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
      )
        super.log().danger()(`${key} cache updated`);

      //
      // set cache response
      ttl += seconds;
      network.ttl = ttl;
      this.storage.set(
        key,
        transformCache(
          omit(network, [
            'config',
            'request',
            'response.config',
            'response.data',
            'response.request'
          ])
        )
      );
    }

    // console.log('useNetwork?', extraOptions.useNetwork);
    observer.complete();
  }

  clearCache(): void {
    this.storage.clear();
  }
}
