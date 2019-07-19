// tslint:disable
import { Subject } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { Response } from './response';
import { ReactiveRecord } from '../platforms/server';
import { Log } from './log';
import { Options } from './options';

/**
 * Public RR Api
 */
export interface ReactiveApi {
  //
  // chained options
  driver(name?: string): ReactiveRecord; // firebase / firestore / http
  network(active: boolean): ReactiveRecord; // response using network call
  save(active: boolean): ReactiveRecord; // save response to cache
  ttl(value: number): ReactiveRecord; // set a max time before next network call
  state(active: boolean): ReactiveRecord; // use first response from state if available
  cache(active: boolean): ReactiveRecord; // use first response from cache if available
  key(name: string): ReactiveRecord; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): ReactiveRecord; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): ReactiveRecord; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): ReactiveRecord; // firestore only
  size(value: number): ReactiveRecord; // firestore only
  ref(path: string): ReactiveRecord; // firebase only
  data(transform: boolean): ReactiveRecord; // @deprecated
  raw(active: boolean): ReactiveRecord; // return original data with metadata
  transform(transformFn: (response: Response) => any): ReactiveRecord; // transform network/state/cache responses
  diff(fn: (cache: any, network: any) => any): ReactiveRecord; // infer into rr response behavior

  //
  // utils
  $log: Subject<Log>;
  http(transformFn: (config: AxiosRequestConfig) => void): ReactiveRecord;
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
  set(id: string, data: any, merge?: boolean);
  update(id: string, data: any);
  on();

  //
  // http verbs
  get(path: string);
  post(path: string, body: any);
  patch(path: string, body: any);
  delete(path: string, body?: any);

  //
  // experimental
  reboot(): void; // reload rr initialization
  reset(): ReactiveRecord;

  //
  // Legacy @deprecated
  useCache(active: boolean): ReactiveRecord;
  useNetwork(active: boolean): ReactiveRecord;
  saveNetwork(active: boolean): ReactiveRecord;
  transformNetwork(transformFn: (response: Response) => any): ReactiveRecord;
  transformCache(transformFn: (response: Response) => any): ReactiveRecord;
  transformResponse(transformFn: (response: Response) => any): ReactiveRecord;
}
