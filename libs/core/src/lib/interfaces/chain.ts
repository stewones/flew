import { ReativeDriverOption } from './driver';

export type ReativeChain =
  | 'driver'
  | 'network'
  | 'cache'
  | 'key'
  | 'query'
  | 'where'
  | 'sort'
  | 'size'
  | 'at'
  | 'after'
  | 'ref'
  | 'http'
  | 'include'
  | 'doc'
  | 'token'
  | 'master'
  | 'object'
  | 'worker'
  | 'select'
  | 'memo'
  | 'raw' // deprecated
  | 'transform' // deprecated
  | 'diff' // deprecated
  | 'save' // deprecated
  | 'ttl' // deprecated
  | 'state'; // deprecated

export interface ReativeChainPayloadWhere {
  field: string;
  operator: string;
  value: any;
}

export interface ReativeChainPayload {
  key?: string; // key used as a property name for the memoized state and cached data
  driver?: ReativeDriverOption;

  useMemo?: boolean; //  use memo for first response
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response

  useMasterKey?: boolean; // from parse
  useSessionToken?: string; // from parse
  useObject?: boolean; // for parse
  useWorker?: boolean;

  ref?: string; //  used for firebase driver
  query?: any; // for any kind of query
  where?: ReativeChainPayloadWhere[];
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
  doc?: any; // firestore `on`
  at?: any; // firestore
  after?: any; // firestore
  fields?: string[]; // used for the include api from parse
  select?: string[]; // parse - select specific fields only

  /**
   * @deprecated
   */
  useState?: boolean; //  use state for first response
  /**
   * @deprecated
   */
  saveNetwork?: boolean; // save network response
  /**
   * @deprecated
   */
  transformResponse?: (data: any) => any; // transform function for network data response
  /**
   * @deprecated
   */
  transformData?: boolean; // shortcut for transform(r=>r.data)
  /**
   * @deprecated
   */
  ttl?: number; // time to live (in seconds. default: 0)
  /**
   * @deprecated
   */
  diff?: (fn: (cache: any, network: any) => boolean) => any; // customize rr response behavior
}
