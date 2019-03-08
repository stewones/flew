import { Hook } from './hook';
import { Connector } from './connector';
import { StorageAdapter } from './storage-adapter';
import { ClientToken } from './client-token';
import { AxiosBasicCredentials } from 'axios';

export interface Options {
  name?: string; // collection name. eg: 'todos'
  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  collection?: string; // eg: users
  driver?: string; // available for now: `firestore` and `elastic`
  timestamp?: boolean; // whether or not to add `updated_at` timestamp
  hook?: Hook;
  connector?: Connector;

  //
  // browser
  useCache?: boolean; // whether or not use cache (works only in browser)
  storage?: StorageAdapter; // storage adapter
  version?: string; // add 'accept-version' to http headers
  token?: ClientToken; // add 'Authorization' token to http headers
  auth?: AxiosBasicCredentials; // to add axios auth header
}

// @deprecated
export interface RROptions extends Options {}
