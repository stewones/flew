import { Response } from './response';
import { Observable, Subject } from 'rxjs';
import { ReactiveRecord } from '../platforms/server';
import { Log } from './log';
import { AxiosRequestConfig } from 'axios';
import { Options } from './options';

/**
 * Public RR Api
 *
 * @export
 * @interface Api
 */
export interface ReactiveApi {
  //
  // chained options
  driver(name?: string): ReactiveRecord; // firebase / firestore / http | [configurable]
  useNetwork(active: boolean): ReactiveRecord; // force the use of network call
  saveNetwork(active: boolean): ReactiveRecord; // as a cache
  transformResponse(transformFn: (response: Response) => any): ReactiveRecord; // transform the network/cache response
  ttl(value: number): ReactiveRecord; // set a max time to cache
  useCache(active: boolean): ReactiveRecord; // when true the first response should be from the cache if exists
  transformCache(transformFn: (response: Response) => any): ReactiveRecord; // transform the response from cache
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
  cache(): any; // storage instance
  http(transformFn: (config: AxiosRequestConfig) => void): ReactiveRecord;
  feed(): void; // add response from cache to store
  init(): void; // init rr manually

  //
  // fire verbs
  find(); // firestore & firebase
  // @todo better types
  // findOne<T>(): Observable<T>;
  // findOne<T>(): Observable<Response<T>>;
  // findOne(): Observable<Response>;
  findOne();
  set(id: string, data: any, merge?: boolean); // firestore
  update(id: string, data: any); // firestore
  on( // firestore & firebase - real time calls doesn't has caching features
    onSuccess: (response: Response | any) => any,
    onError: (response: any) => any
  ): any;

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
  // Legacy
  transformNetwork(transformFn: (response: Response) => any): ReactiveRecord; // scheduled to @deprecate. use `transformResponse` instead
}
