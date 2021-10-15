import { ReativeDriverOption } from './driver';

export type ResponseSource = 'worker' | 'http' | 'state' | 'cache' | 'network';
export interface Response<T = any> {
  data?: T; // formatted data response
  response?: any; // generic response from driver
  key?: string | boolean; // key used for cache
  collection?: string;
  driver?: ReativeDriverOption;
  ttl?: number;
  source?: ResponseSource;
}
