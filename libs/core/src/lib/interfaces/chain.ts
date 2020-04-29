import { ReativeDriverOption } from './driver';

export type ReativeChain =
  | 'driver'
  | 'network'
  | 'save'
  | 'ttl'
  | 'state'
  | 'cache'
  | 'key'
  | 'query'
  | 'where'
  | 'sort'
  | 'size'
  | 'at'
  | 'after'
  | 'ref'
  | 'raw'
  | 'transform'
  | 'diff'
  | 'http'
  | 'include'
  | 'doc'
  | 'token'
  | 'master'
  | 'object'
  | 'worker'
  | 'select';

export interface ReativeChainPayloadWhere {
  field: string;
  operator: string;
  value: any;
}

export interface ReativeChainPayload {
  ttl?: number; // time to live (in seconds. default: 0)
  key?: string; // key used for cache. defaults to requested info
  driver?: ReativeDriverOption;

  useState?: boolean; //  use state for first response
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response
  saveNetwork?: boolean; // save network response
  useMasterKey?: boolean; // from parse
  useSessionToken?: string; // from parse
  useObject?: boolean; // for parse
  useWorker?: boolean;

  transformResponse?: (data: any) => any; // transform function for network data response
  transformData?: boolean; // shortcut for transform(r=>r.data)
  ref?: string; //  used for firebase driver
  query?: any; // for any kind of query
  where?: ReativeChainPayloadWhere[];
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
  doc?: any; // firestore `on`
  at?: any; // firestore
  after?: any; // firestore
  fields?: string[]; // used for the include api from parse
  diff?: (fn: (cache: any, network: any) => boolean) => any; // customize rr response behavior
  select?: string[]; // parse - select specific fields only
}
