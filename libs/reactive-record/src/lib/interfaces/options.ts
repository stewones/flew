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
  useLog?: boolean;
  useLogTrace?: boolean;

  //
  // browser
  useCache?: boolean; // whether or not use cache (works only in browser)
  storage?: StorageAdapter; // storage adapter
  version?: string; // add 'accept-version' to http headers
  feed?: boolean; // whether should feed store with cached results

  //
  // for internal initializations
  chain?: Chain;
}
