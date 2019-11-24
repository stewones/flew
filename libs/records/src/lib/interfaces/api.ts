// tslint:disable
import { Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { Response } from './response';
import { Records } from '../platforms/server';
import { Log } from './log';
import { Options } from './options';

export interface SetOptions {
  merge?: boolean;
}

/**
 * Public RR Api
 */
export interface ReativeApi {
  //
  // chained options
  driver(name?: string): Records; // firebase / firestore / http
  network(active: boolean): Records; // response using network call
  save(active: boolean): Records; // save response to cache
  ttl(value: number): Records; // set a max time before next network call
  state(active: boolean): Records; // use first response from state if available
  cache(active: boolean): Records; // use first response from cache if available
  key(name: string): Records; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): Records; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): Records; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): Records; // firestore only
  size(value: number): Records; // firestore only
  at(value: string | number);
  after(value: string | number);

  ref(path: string): Records; // firebase only

  raw(active: boolean): Records; // return original data with metadata
  transform(transformFn: (response: Response) => any): Records; // transform network/state/cache responses
  diff(fn: (cache: any, network: any) => any): Records; // infer into rr response behavior

  //
  // utils
  $log: Subject<Log>;
  http(transformFn: (config: AxiosRequestConfig) => void): Records;
  feed(): void; // add response from cache to store
  init(runtime?: Options): void; // init rr manually

  clearCache(): void; // @todo deprecate and create an exported function from cache package
  firebase(): any; // firebase instance @todo deprecate and create an exported function from firebase package
  firestore(): any; // firebase instance @todo deprecate and create an exported function from firebase package
  storage(): any; // storage instance @todo deprecate and create an exported function from cache package

  //
  // fire verbs
  find();
  findOne();
  set(data: any, options?: SetOptions);
  update(data: any);
  on();

  //
  // http verbs
  get(path: string);
  post(path: string, body: any);
  patch(path: string, body: any);
  delete(path: string, body?: any);

  //
  // parse
  include(fields: string[]): Records;

  //
  // experimental
  reboot(): void; // reload rr initialization
  reset(): Records;
  model(): any; // parse object

  //
  // Legacy @deprecated
  data(transform: boolean): Records;
  useCache(active: boolean): Records;
  useNetwork(active: boolean): Records;
  saveNetwork(active: boolean): Records;
  transformNetwork(transformFn: (response: Response) => any): Records;
  transformCache(transformFn: (response: Response) => any): Records;
  transformResponse(transformFn: (response: Response) => any): Records;
}
