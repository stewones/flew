import { RROptions } from './rr-options';
import { FirebaseConfig } from './firebase-config';
import { StorageAdapter } from './storage-adapter';
import { RRClientToken } from './client-token';
import { AxiosBasicCredentials } from 'axios';

/**
 * @export
 * @interface CacheOptions
 * @extends {RROptions}
 */
export interface CacheOptions extends RROptions {
  // ttl?: number; // @todo causing bug with RR instance. time to live in seconds. (default 0)
  config?: FirebaseConfig; // firebase web config
  firebase?: any; // firebase sdk to initialize connectors
  storage?: StorageAdapter | any; // storage adapter
  version?: string; // add 'accept-version' to http headers
  token?: RRClientToken; // add 'Authorization' token to http headers
  auth?: AxiosBasicCredentials;
}

export interface RRCacheOptions extends CacheOptions {}
