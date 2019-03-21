import { Options } from './options';
import { FirebaseConfig } from './firebase-config';
import { StorageAdapter } from './storage-adapter';
import { ClientToken } from './client-token';
import { AxiosBasicCredentials } from 'axios';

export interface CacheOptions extends Options {
  config?: FirebaseConfig; // firebase web config
  firebase?: any; // firebase sdk to initialize connectors
  storage?: StorageAdapter; // storage adapter
  version?: string; // add 'accept-version' to http headers
  token?: ClientToken; // add 'Authorization' token to http headers
  auth?: AxiosBasicCredentials;
}

//
// deprecated
export interface RRCacheOptions extends CacheOptions {}
