import { ReativeDriverOption } from './driver';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '../utils/logger';

export interface ReativeOptions {
  name?: string; // collection name. eg: 'todos'
  collection?: string; // eg: same as name
  identifier?: string; // default to doc_id
  disableAutoID?: boolean; // disable doc_id generation
  disableTimestamp?: boolean;

  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  httpConfig?: AxiosRequestConfig;

  driver?: ReativeDriverOption;
  timestampCreated?: string; // field name
  timestampUpdated?: string; // field name
  timestampObject?: boolean;

  silent?: boolean; // controls whether or not show internal logs
  logger?: Logger;

  //
  // browser
  useCache?: boolean;
  useMemo?: boolean;
  useNetwork?: boolean;
  useWorker?: boolean; // global config to always use worker
  persistence?: boolean;
  useState?: boolean; // @deprecated
  saveNetwork?: boolean; // @deprecated
}
