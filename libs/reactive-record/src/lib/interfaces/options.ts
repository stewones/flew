import { Connector } from './connector';
import { StorageAdapter } from './storage';
import { ReactiveDriverOption } from './driver';
import { Chain } from './chain';

export interface Options {
  name?: string; // collection name. eg: 'todos'
  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  collection?: string; // eg: users
  driver?: ReactiveDriverOption;
  timestamp?: boolean; // whether or not to add `updated_at` timestamp
  connector?: Connector;
  silent?: boolean; // controls whether or not show internal logs
  useLog?: boolean; // @deprecated use `silent` instead
  useLogTrace?: boolean; // @experimental `silent` must be off
  firebaseConfig?: any;

  //
  // browser
  useCache?: boolean; // whether or not use cache (works only in browser)
  storage?: StorageAdapter; // storage adapter
  feed?: boolean; // whether should feed store with cached results
  persistence?: boolean;
  dbName?: string;
  dbStore?: string;

  //
  // for internal initializations
  chain?: Chain;
}
