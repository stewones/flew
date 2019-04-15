import { Response } from './response';
import { Observable } from 'rxjs';
import { ReactiveDriver } from './driver';

/**
 * Public RR Api
 *
 * @export
 * @interface Api
 */
export interface ReactiveApi extends ReactiveDriver {
  //
  // chained options
  driver(name: string); // firebase / firestore / http
  useNetwork(active: boolean); // force the use of network call
  saveNetwork(active: boolean); // as a cache
  transformNetwork(transformFn: (response: Response) => any); // @deprecated same as transformResponse
  transformResponse(transformFn: (response: Response) => any); // transform the network/cache response
  ttl(value: number); // set a max time to cache
  useCache(active: boolean); // when true the first response should be from the cache if exists
  transformCache(transformFn: (response: Response) => any); // transform the response from cache
  key(name: string); // cache name
  query(by: { [key: string]: {} } | { [key: string]: {} }[]); // firestore only - this is an object literal way of `where`
  where(field: string, operator: string, value: string | number | boolean); // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }); // firestore only
  size(value: number); // firestore only
  ref(path: string); // firebase only

  //
  // utils
  clearCache(): void;
  useLog(active: boolean): void;
  useLogTrace(active: boolean): void;

  //
  // @todo move to ReactiveDriver
  //
  //
  // firebase/firestore requests
  find(): Observable<Response>; // firestore & firebase
  findOne(): Observable<Response>; // firestore & firebase
  set(id: string, data: any, merge?: boolean): Observable<any>; // firestore
  update(id: string, data: any): Observable<any>; // firestore
  on( // firestore & firebase - real time calls doesn't has caching features
    onSuccess: (response: Response | any) => any,
    onError: (response: any) => any
  ): any;

  //
  // http requests
  get(path: string): Observable<Response>;
  post(path: string, body: any): Observable<Response>;
  patch(path: string, body: any): Observable<Response>;
  delete(path: string, body?: any): Observable<Response>;
}
