import { merge, omit, isEmpty, isEqual } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { PartialObserver } from 'rxjs';
import { RRCacheOptions, RRExtraOptions } from '@firetask/reactive-record';
import { RROptions } from '../interfaces/options';
import { RRFirebaseConnector } from '../connectors/firebase';
import { RRFirestoreConnector } from '../connectors/firestore';
import { RRResponse } from '../interfaces/response';

/**
 * @export
 * @class RRCachePlugin
 */
export class RRCachePlugin {
  //
  // default params
  public params: RRCacheOptions = {
    hook: {},
    token: {
      type: 'Bearer'
    }
  };

  constructor(options: RRCacheOptions) {
    merge(this.params, options);
    if (!this.params.storage) throw new Error('missing storage instance');

    merge(this.params, <RROptions>{
      hook: {
        //
        // customize http behavior
        http: {
          pre: (config: AxiosRequestConfig) => {
            if (this.params.token.value)
              config.headers['Authorization'] = `${this.params.token.type} ${
                this.params.token.value
              }`;
            if (this.params.version)
              config.headers['accept-version'] = this.params.version;

            if (this.params.auth) config.auth = this.params.auth;
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
    });

    if (isEmpty(this.params.connector)) {
      if (!this.params.config) throw new Error('missing firebase config');
      if (!this.params.firebase) throw new Error('missing firebase sdk');
      this.params.connector = {
        firebase: new RRFirebaseConnector(
          this.params.firebase,
          this.params.config
        ),
        firestore: new RRFirestoreConnector(
          this.params.firebase,
          this.params.config
        )
      };
    }

    return <any>(
      omit(this.params, ['config', 'firebase', 'storage', 'version', 'token'])
    );
  }

  /**
   * get client cache
   *
   * @param {string} key
   * @param {PartialObserver<any>} observer
   * @param {RRExtraOptions} [extraOptions={}]
   * @returns
   * @memberof ClientSetup
   */
  async getCache(
    key: string,
    observer: PartialObserver<any>,
    extraOptions: RRExtraOptions = {}
  ) {
    const cache: RRResponse & { ttl: number } = await this.params.storage.get(
      key
    );
    const transformNetwork: any =
      extraOptions.transformNetwork &&
      typeof extraOptions.transformNetwork === 'function'
        ? extraOptions.transformNetwork
        : (data: RRResponse) => data;

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
   * @param {(RRResponse & { ttl: number })} network
   * @param {PartialObserver<any>} observer
   * @param {RRExtraOptions} [extraOptions]
   * @memberof ClientSetup
   */
  async setCache(
    key: string,
    network: RRResponse & { ttl: number },
    observer: PartialObserver<any>,
    extraOptions: RRExtraOptions = {}
  ) {
    const cache: RRResponse & { ttl: number } = await this.params.storage.get(
      key
    );
    const transformCache: any =
      extraOptions.transformCache &&
      typeof extraOptions.transformCache === 'function'
        ? extraOptions.transformCache
        : (data: RRResponse) => data;
    const transformNetwork: any =
      extraOptions.transformNetwork &&
      typeof extraOptions.transformNetwork === 'function'
        ? extraOptions.transformNetwork
        : (data: RRResponse) => data;
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
        let ttl = extraOptions.ttl /*|| this.params.ttl*/ || 0;
        //
        // set cache response
        ttl += seconds;
        network.ttl = ttl;
        this.params.storage.set(
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
