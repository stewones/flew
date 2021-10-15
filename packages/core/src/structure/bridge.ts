import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { FlewOptions } from './options';

/**
 * Flew public api
 *
 * @export
 * @interface FlewBridge
 * @deprecated
 */
export interface FlewBridge {
  options: FlewOptions;
  reset(): FlewBridge; // reset chaining payload

  from(driver: string): FlewBridge; // firebase / firestore / http
  network(active: boolean): FlewBridge; // response using network call

  cache(active: boolean): FlewBridge; // use first response from cache if available
  state(active: boolean): FlewBridge;

  key(name: string): FlewBridge; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): FlewBridge; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | [],
  ): FlewBridge; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): FlewBridge; // firestore only
  size(value: number): FlewBridge; // firestore only
  at(value: string | number): FlewBridge;
  after(value: string | number): FlewBridge;
  ref(path: string): FlewBridge; // firebase only

  //
  // utils
  http(transformFn: (config: AxiosRequestConfig) => void): FlewBridge;
  token(session: string): FlewBridge;
  diff(compareFn: (cache, network) => boolean): FlewBridge;
  response(responseFn: (network) => void): FlewBridge;

  //
  // actions
  get(id?: string): Observable<any>;
  post(data: any): Observable<any>;
  put(id: string, data: any): Observable<any>;
  //
  // verbs
  find<T>(): Observable<T>;
  findOne<T>(): Observable<T>;
  set<T>(data: any, options?: any): Observable<T>;
  update<T>(data: any): Observable<T>;
  on<T>(): Observable<T>;
  count(): Observable<number>;
  run<T>(name: string, payload: any): Observable<T>;

  //
  // http verbs
  get<T>(path: string): Observable<T>;
  post<T>(path: string, body: any): Observable<T>;
  patch<T>(path: string, body: any): Observable<T>;
  delete<T>(path?: string, body?: any): Observable<T>;

  //
  // parse
  include(fields: string[]): FlewBridge;
  doc(value: any): FlewBridge;
  select(value: string[]): FlewBridge;
  master(value: boolean): FlewBridge;
}
