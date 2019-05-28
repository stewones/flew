export interface Chain {
  ttl?: number; // time to live (in seconds. default: 0)
  key?: string; // key used for cache. defaults to requested info
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response
  saveNetwork?: boolean; // save network response
  transformCache?: (data: any) => any; // transform function for cache data
  transformResponse?: (data: any) => any; // transform function for network data response
  transformNetwork?: (data: any) => any; // @deprecated same as transformResponse
  transformData?: boolean; // shortcut for transformResponse(r=>r.data)
  ref?: string; //  used for firebase driver
  query?: any;
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
  doc?: string | number; // firestore `on`
  diff?: (fn: any) => any;
}
