import { Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { Log } from './log';
import { RebasedOptions } from './options';

/**
 * Public RR Api
 */
export interface RebasedAPI {
  options: RebasedOptions;
  reset(): RebasedAPI; // reset chaining payload

  driver(name: string): RebasedAPI; // firebase / firestore / http
  network(active: boolean): RebasedAPI; // response using network call

  cache(active: boolean): RebasedAPI; // use first response from cache if available
  key(name: string): RebasedAPI; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): RebasedAPI; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): RebasedAPI; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): RebasedAPI; // firestore only
  size(value: number): RebasedAPI; // firestore only
  at(value: string | number);
  after(value: string | number);
  ref(path: string): RebasedAPI; // firebase only

  //
  // utils
  $log: Subject<Log>;
  http(transformFn: (config: AxiosRequestConfig) => void): RebasedAPI;

  //
  // fire verbs
  find();
  findOne();
  set(data: any, options?: any);
  update(data: any);
  on();
  count();
  run(name: string, payload: any);

  //
  // http verbs
  get(path: string);
  post(path: string, body: any);
  patch(path: string, body: any);
  delete(path: string, body?: any);

  //
  // parse
  include(fields: string[]): RebasedAPI;
  doc(value: any): RebasedAPI;
  select(value: string[]): RebasedAPI;
}
