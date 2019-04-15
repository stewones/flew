export interface Response<T = any> {
  data?: T; // formatted data response
  response?: any; // generic response from driver
  key?: string; // key used for cache
  collection?: string;
}
