import { RROptions } from './rr-options';
import { FirebaseConfig } from './firebase-config';
import { RRCacheStorage } from './rr-cache-storage';
import { RRClientToken } from './rr-client-token';

/**
 * @export
 * @interface RRCacheOptions
 * @extends {RROptions}
 */
export interface RRCacheOptions extends RROptions {
  ttl?: number; // time to live in seconds. (default 0)
  config?: FirebaseConfig; // firebase web config
  firebase?: any; // firebase sdk to initialize connectors
  storage?: RRCacheStorage | any; // storage adapter
  version?: string; // add 'accept-version' to http headers
  token?: RRClientToken; // add 'Authorization' token to http headers
}
