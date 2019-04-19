import { Connector } from './connector';
import { StorageAdapter } from './storage';
import { ReactiveDriverOption } from './driver';

export interface Options {
  name?: string; // collection name. eg: 'todos'
  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  collection?: string; // eg: users
  driver?: ReactiveDriverOption;
  timestamp?: boolean; // whether or not to add `updated_at` timestamp
  connector?: Connector;
  useLog?: boolean;
  useLogTrace?: boolean;

  //
  // browser
  useCache?: boolean; // whether or not use cache (works only in browser)
  storage?: StorageAdapter; // storage adapter
  version?: string; // add 'accept-version' to http headers
  feed?: boolean; // whether should feed store with cached results
}

export interface ExtraOptions {
  ttl?: number; // time to live (in seconds. default: 0)
  key?: string; // key used for cache. defaults to requested info
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response
  saveNetwork?: boolean; // save network response
  transformCache?: (data: any) => any; // transform function for cache data
  transformResponse?: (data: any) => any; // transform function for network data response
  transformNetwork?: (data: any) => any; // @deprecated same as transformResponse
  transformData?: boolean; // shortcut for transformResponse(r=>r.data)
  ref?: string; //  used for firebase driver
}
