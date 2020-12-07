import { RebasedDriverOption } from './driver';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '../effects/logger';

export interface RebasedOptions {
  from?: string; // eg: 'todos'
  identifier?: string; // default to doc_id
  disableAutoID?: boolean; // disable doc_id generation
  disableTimestamp?: boolean;

  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  pathname?: string; // eg: /some/long/path/to/resource
  httpConfig?: AxiosRequestConfig;

  driver?: RebasedDriverOption;
  timestampCreated?: string; // field name
  timestampUpdated?: string; // field name
  timestampObject?: boolean;

  silent?: boolean; // controls whether or not show internal logs
  logger?: Logger;

  //
  // browser
  useCache?: boolean;
  useState?: boolean;
  useNetwork?: boolean;
  persistence?: boolean;
}
