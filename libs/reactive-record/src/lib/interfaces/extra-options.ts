export interface ExtraOptions {
  ttl?: number; // time to live (in seconds. default: 0)
  key?: string; // key used for cache. defaults to requested info
  useCache?: boolean; //  use cache for first response
  useNetwork?: boolean; // use network for first response
  saveNetwork?: boolean; // save network response
  transformCache?: (data: any) => any; // transform function for cache data
  transformNetwork?: (data: any) => any; // transform function for network data response
  ref?: string; //  used for firebase driver
}

export interface RRExtraOptions extends ExtraOptions {}
