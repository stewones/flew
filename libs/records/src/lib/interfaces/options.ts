import { ReativeDriverOption } from './driver';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '../utils/logger';

export interface ReativeOptions {
  name?: string; // collection name. eg: 'todos'
  collection?: string; // eg: same as name
  identifier?: string; // default to doc_id

  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  httpConfig?: AxiosRequestConfig;

  driver?: ReativeDriverOption;
  timestamp?: boolean; // whether or not to add created/updated automatically
  timestampCreated?: string; // field name
  timestampUpdated?: string; // field name

  silent?: boolean; // controls whether or not show internal logs
  logger?: Logger;

  //
  // browser
  useCache?: boolean;
  useState?: boolean;
  useNetwork?: boolean;
  saveNetwork?: boolean;
  persistence?: boolean;
}

/**
 * @deprecated
 * use ReativeOptions instead
 */
export interface Options extends ReativeOptions {}
