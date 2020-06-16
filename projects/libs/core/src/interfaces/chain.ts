import { RebasedDriverOption } from './driver';

export type RebasedChain =
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
  | 'select'
  | 'memo'
  | 'near'
  | 'withinKilometers'
  | 'withinMiles';

export interface RebasedChainPayloadWhere {
  field: string;
  operator: string;
  value: any;
}

export interface RebasedChainPayload {
  key?: string; // key used as a property name for the memoized state and cached data
  driver?: RebasedDriverOption;

  useMemo?: boolean; //  use memo for first response
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response

  useMasterKey?: boolean; // from parse
  useSessionToken?: string; // from parse
  useObject?: boolean; // for parse
  useWorker?: boolean;

  ref?: string; //  used for firebase driver
  query?: any; // for any kind of query
  where?: RebasedChainPayloadWhere[];
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
  doc?: any; // firestore `on`
  at?: any; // firestore
  after?: any; // firestore
  fields?: string[]; // used for the include api from parse
  select?: string[]; // parse - select specific fields only
  near?: any;
  withinKilometers?: any;
  withinMiles?: any;
}
