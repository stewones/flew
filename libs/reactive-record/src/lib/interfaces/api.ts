// tslint:disable
import { Response } from './response';
import { Subject } from 'rxjs';
import { ReactiveRecord } from '../platforms/server';
import { Log } from './log';
import { AxiosRequestConfig } from 'axios';
import { Options } from './options';

/**
 * Public RR Api
 */
export interface ReactiveApi {
  //
  // chained options
  driver(name?: string): ReactiveRecord; // firebase / firestore / http | [configurable]
  network(active: boolean): ReactiveRecord; // force the use of network call
  save(active: boolean): ReactiveRecord; // as a cache
  ttl(value: number): ReactiveRecord; // set a max time to cache
  cache(active: boolean): ReactiveRecord; // when true the first response should be from the cache if exists
  state(active: boolean): ReactiveRecord;
  key(name: string): ReactiveRecord; // cache name
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): ReactiveRecord; // firestore only - this is an object literal way of `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): ReactiveRecord; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): ReactiveRecord; // firestore only
  size(value: number): ReactiveRecord; // firestore only
  ref(path: string): ReactiveRecord; // firebase only
  data(transform: boolean): ReactiveRecord;
  transform(transformFn: (response: Response) => any): ReactiveRecord; // transform the network/cache response
  useLog(active: boolean): ReactiveRecord; // [configurable]
  useLogTrace(active: boolean): ReactiveRecord; // [configurable]
  diff(fn): ReactiveRecord;

  //
  // utils
  $log: Subject<Log>;
  init(runtime?: Options): void;
  clearCache(): void;
  firebase(): any; // firebase instance
  firestore(): any; // firebase instance
  storage(): any; // storage instance
  http(transformFn: (config: AxiosRequestConfig) => void): ReactiveRecord;
  feed(): void; // add response from cache to store
  init(): void; // init rr manually

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
