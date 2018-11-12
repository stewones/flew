import { merge, omit, isEmpty, isEqual } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { PartialObserver } from 'rxjs';


import { RROptions } from '../interfaces/rr-options';
import { RRResponse } from '../interfaces/rr-response';
import { RRExtraOptions } from '../interfaces/rr-extra-options';
import { RRCacheOptions } from '../interfaces/rr-cache-options';
import { RRFirebaseConnector } from '../connectors/firebase';
import { RRFirestoreConnector } from '../connectors/firestore';


/**
 * @export
 * @class RRCachePlugin
 */
export class RRCachePlugin {

    //
    // default params
    public params: RRCacheOptions = {
        ttl: 0,
        hook: {},
        token: {
            type: 'Bearer'
        }
    };

    constructor(options: RRCacheOptions) {
        merge(this.params, options);

        if (!this.params.config) throw ('missing firebase config');
        if (!this.params.firebase) throw ('missing firebase sdk');
        if (!this.params.storage) throw ('missing storage instance');

        merge(this.params, <RROptions>{
            connector: {
                firebase: new RRFirebaseConnector(this.params.firebase, this.params.config),
                firestore: new RRFirestoreConnector(this.params.firebase, this.params.config)
            },
            hook: {
                //
                // customize http behavior
                http: {
                    pre: (config: AxiosRequestConfig) => {
                        if (this.params.token.value) config.headers['Authorization'] = `${this.params.token.type} ${this.params.token.value}`;
                        if (this.params.version) config.headers['accept-version'] = this.params.version;
                    },
                    post: {
                        before: (key, observer, RRExtraOptions) => {
                            console.log('hook.http.post.before');
                            return this.getCache(key, observer, RRExtraOptions);
                        },
                        after: async (key, network, observer, RRExtraOptions) => {
                            console.log('hook.http.post.after');
                            return this.setCache(key, network, observer, RRExtraOptions);
                        }
                    },
                    patch: {
                        before: (key, observer, RRExtraOptions) => {
                            console.log('hook.http.patch.before');
                            return this.getCache(key, observer, RRExtraOptions);
                        },
                        after: async (key, network, observer, RRExtraOptions) => {
                            console.log('hook.http.patch.after');
                            return this.setCache(key, network, observer, RRExtraOptions);
                        }
                    },
                    get: {
                        before: async (key, observer, RRExtraOptions) => {
                            console.log('hook.http.get.before');
                            return await this.getCache(key, observer, RRExtraOptions);
                        },
                        after: async (key, network, observer, RRExtraOptions) => {
                            console.log('hook.http.get.after');
                            return this.setCache(key, network, observer, RRExtraOptions);
                        }
                    }
                },
                //
                // customize search behavior
                find: {
                    before: (key, observer, RRExtraOptions) => {
                        console.log('hook.find.before');
                        return this.getCache(key, observer, RRExtraOptions);
                    },
                    after: async (key, network, observer, RRExtraOptions) => {
                        console.log('hook.find.after');
                        return this.setCache(key, network, observer, RRExtraOptions);
                    }
                }
            }
        });

        return omit(this.params, ['config', 'firebase', 'storage', 'version', 'token']);
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
    async getCache(key: string, observer: PartialObserver<any>, extraOptions: RRExtraOptions = {}) {
        const cache: RRResponse & { ttl: number } = await this.params.storage.get(key);
        const transformNetwork: any = extraOptions.transformNetwork && typeof extraOptions.transformNetwork === 'function' ? extraOptions.transformNetwork : (data: RRResponse) => data;

        //
        // return cached response immediately to view
        if (cache && !isEmpty(cache.data))
            observer.next(transformNetwork(cache));

        //
        // check for TTL
        // should not call network
        const seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;
        if ((cache && seconds < cache.ttl) && (!isEmpty(cache.data))) {
            observer.complete();
            return false;
        }

        //
        // otherwise
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
    async setCache(key: string, network: RRResponse & { ttl: number }, observer: PartialObserver<any>, extraOptions: RRExtraOptions = {}) {
        const cache: RRResponse & { ttl: number } = await this.params.storage.get(key);
        const transformCache: any = extraOptions.transformCache && typeof extraOptions.transformCache === 'function' ? extraOptions.transformCache : (data: RRResponse) => data;
        const transformNetwork: any = extraOptions.transformNetwork && typeof extraOptions.transformNetwork === 'function' ? extraOptions.transformNetwork : (data: RRResponse) => data;

        //
        // return network response only if different from cache
        if ((cache && !isEqual(cache.data, network.data)) || (cache && isEmpty(cache.data)) || !cache) {
            //
            // return network response
            observer.next(transformNetwork(network));

            //
            // time to live
            let seconds = new Date().getTime() / 1000 /*/ 60 / 60 / 24 / 365*/;

            if (isEmpty(cache) || (cache && seconds >= cache.ttl) || extraOptions.forceCache) {
                console.log(`${key} cache empty or updated`);
                let ttl = extraOptions.ttl || this.params.ttl;
                //
                // set cache response
                ttl += seconds;
                network.ttl = ttl;
                this.params.storage.set(key, transformCache(omit(network, ['config', 'request', 'response.config', 'response.data', 'response.request'])));
            }

        }
        observer.complete();
    }
}


/**
 * @deprecated
 * @export
 * @class ClientSetup
 * @extends {RRCachePlugin}
 */
export class ClientSetup extends RRCachePlugin { }