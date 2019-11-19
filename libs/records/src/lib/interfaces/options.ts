import { Connector } from './connector';
import { StorageAdapter } from './storage';
import { ReativeDriverOption } from './driver';
import { Chain } from './chain';

export interface Options {
  name?: string; // collection name. eg: 'todos'
  collection?: string; // eg: same as name

  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api

  driver?: ReativeDriverOption;
  timestamp?: boolean; // whether or not to add `updated_at` timestamp

  silent?: boolean; // controls whether or not show internal logs
  useLog?: boolean; // @deprecated use `silent` instead
  useLogTrace?: boolean; // @experimental `silent` must be off

  //
  // browser
  useCache?: boolean;
  useState?: boolean;
  useNetwork?: boolean;
  saveNetwork?: boolean;
  persistence?: boolean;

  //
  // for internal initializations
  chain?: Chain;
}
