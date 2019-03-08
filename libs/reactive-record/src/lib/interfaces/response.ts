export interface Response<T = any> {
  data?: T; // formatted data response
  response?: any; // generic response from driver
  key?: string; // key used for cache
}

// @deprecated
export interface RRResponse<T = any> extends Response<T> {}
