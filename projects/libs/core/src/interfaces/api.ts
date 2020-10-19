import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { RebasedOptions } from './options';

/**
 * Public Api
 */
export interface RebasedAPI {
  options: RebasedOptions;
  reset(): RebasedAPI; // reset chaining payload

  driver(name: string): RebasedAPI; // firebase / firestore / http
  network(active: boolean): RebasedAPI; // response using network call

  cache(active: boolean): RebasedAPI; // use first response from cache if available
  memo(active: boolean): RebasedAPI;

  key(name: string): RebasedAPI; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): RebasedAPI; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): RebasedAPI; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): RebasedAPI; // firestore only
  size(value: number): RebasedAPI; // firestore only
  at(value: string | number): RebasedAPI;
  after(value: string | number): RebasedAPI;
  ref(path: string): RebasedAPI; // firebase only

  //
  // utils
  http(transformFn: (config: AxiosRequestConfig) => void): RebasedAPI;

  //
  // verbs
  find<T>(): Observable<T>;
  findOne<T>(): Observable<T>;
  set<T>(data: any, options?: any): Observable<T>;
  update<T>(data: any): Observable<T>;
  on<T>(): Observable<T>;
  count<T>(): Observable<T>;
  run<T>(name: string, payload: any): Observable<T>;

  //
  // http verbs
  get<T>(path: string): Observable<T>;
  post<T>(path: string, body: any): Observable<T>;
  patch<T>(path: string, body: any): Observable<T>;
  delete<T>(path?: string, body?: any): Observable<T>;

  //
  // parse
  include(fields: string[]): RebasedAPI;
  doc(value: any): RebasedAPI;
  select(value: string[]): RebasedAPI;
  master(value: boolean): RebasedAPI;
}
