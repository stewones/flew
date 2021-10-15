import { RebasedDriverOption } from './driver';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '../effects/logger';

export interface RebasedOptions {
  collection?: string; // eg: 'todos'
  identifier?: string; // default to doc_id
  disableAutoID?: boolean; // disable doc_id generation

  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  pathname?: string; // eg: /some/long/path/to/resource
  httpConfig?: AxiosRequestConfig;

  from?: RebasedDriverOption; // driver that can be instantiated at runtime
  driver?: RebasedDriverOption; // default driver to be instantiated only once

  timestampEnabled?: boolean;
  timestampObject?: boolean;
  timestampCreated?: string; // field name
  timestampUpdated?: string; // field name

  silent?: boolean; // controls whether or not show internal logs
  logger?: Logger;

  //
  // browser
  useCache?: boolean;
  useState?: boolean;
  useNetwork?: boolean;
  persistence?: boolean;
}
