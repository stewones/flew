import { merge, omit, isEmpty, isEqual } from 'lodash';
import { AxiosRequestConfig, AxiosBasicCredentials } from 'axios';
import { PartialObserver } from 'rxjs';

import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ExtraOptions } from '../interfaces/extra-options';
import { PlatformServer } from './server';
import { StorageAdapter } from '../interfaces/storage-adapter';
import { ClientToken } from '../interfaces/client-token';

export class PlatformBrowser extends PlatformServer {
  version: string; // 'accept-version' to http headers
  auth: AxiosBasicCredentials;
  token: ClientToken; // 'Authorization' token to http headers
  storage: StorageAdapter; // storage adapter

  constructor(options: Options) {
    super(options);
    this.init(options);
  }

  init(options) {
    if (!this.storage) throw new Error('missing storage instance');

    const newParams = <Options>{
      hook: {
        //
        // customize http behavior
        http: {
          pre: (config: AxiosRequestConfig) => {
            if (this.token.value)
              config.headers['Authorization'] = `${this.token.type} ${
                this.token.value
              }`;
            if (this.version) config.headers['accept-version'] = this.version;

            if (this.auth) config.auth = this.auth;
          },
          post: {
            before: (key, observer, extraOptions) => {
              console.log('hook.http.post.before');
              return this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              console.log('hook.http.post.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          },
          patch: {
            before: (key, observer, extraOptions) => {
              console.log('hook.http.patch.before');
              return this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              console.log('hook.http.patch.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          },
          get: {
            before: async (key, observer, extraOptions) => {
              console.log('hook.http.get.before');
              return await this.getCache(key, observer, extraOptions);
            },
            after: async (key, network, observer, extraOptions) => {
              console.log('hook.http.get.after');
              return this.setCache(key, network, observer, extraOptions);
            }
          }
        },
        //
        // customize search behavior
        find: {
          before: (key, observer, extraOptions) => {
            console.log('hook.find.before');
            return this.getCache(key, observer, extraOptions);
          },
          after: async (key, network, observer, extraOptions) => {
            console.log('hook.find.after');
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
  async getCache(
    key: string,
    observer: PartialObserver<any>,
    extraOptions: ExtraOptions = {}
  ) {
    const cache: Response & { ttl: number } = await this.storage.get(key);
    const transformNetwork: any =
      extraOptions.transformNetwork &&
      typeof extraOptions.transformNetwork === 'function'
        ? extraOptions.transformNetwork
        : (data: Response) => data;

    const useCache: boolean = extraOptions.useCache === false ? false : true;

    //
    // avoid caching
    if (useCache === false) return true;

    //
    // return cached response immediately to view
    if (useCache && cache && !isEmpty(cache.data))
      observer.next(transformNetwork(cache));

    //
    // check for TTL
    // should not call network
    const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
    // console.log(`seconds`, seconds);
    // console.log(`useCache`, useCache);
    // console.log(`cache`, cache);

    if (useCache && (cache && seconds < cache.ttl) && !isEmpty(cache.data)) {
      // console.log(`dont call network`);
      observer.complete();
      return false;
    }

    //
    // otherwise
    // console.log('get cache pass');
    return true;
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
  async setCache(
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
    const transformNetwork: any =
      extraOptions.transformNetwork &&
      typeof extraOptions.transformNetwork === 'function'
        ? extraOptions.transformNetwork
        : (data: Response) => data;
    const saveNetwork: boolean =
      extraOptions.saveNetwork === false ? false : true;

    //
    // defaults to
    // return network response only if different from cache
    if (
      (cache && !isEqual(cache.data, network.data)) ||
      (cache && isEmpty(cache.data)) ||
      !cache
    ) {
      //
      // return network response
      observer.next(transformNetwork(network));
      //
      // time to live
      const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
      if (
        saveNetwork &&
        ((isEmpty(network.data) && cache) ||
          isEmpty(cache) ||
          (cache && seconds >= cache.ttl))
      ) {
        console.log(`${key} cache empty or updated`);
        let ttl = extraOptions.ttl /*|| this.ttl*/ || 0;
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
    }
    //
    // force network return
    else if (extraOptions.useNetwork) {
      observer.next(transformNetwork(network));
    }
    // console.log('useNetwork?', extraOptions.useNetwork);
    observer.complete();
  }
}
