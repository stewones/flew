import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { RebasedCore } from 'src';
import { RebasedOptions } from './options';

/**
 * Public Api
 */
export interface RebasedAPI {
  options: RebasedOptions;
  reset(): RebasedCore; // reset chaining payload

  driver(name: string): RebasedCore; // firebase / firestore / http
  network(active: boolean): RebasedCore; // response using network call

  cache(active: boolean): RebasedCore; // use first response from cache if available
  memo(active: boolean): RebasedCore;

  key(name: string): RebasedCore; // define an unique name for cache/state
  query(by: { [key: string]: {} } | { [key: string]: {} }[]): RebasedCore; // firestore only - this is an object literal way for `where`
  where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): RebasedCore; // firestore only - short way as firebase sdk does
  sort(by: { [key: string]: string }): RebasedCore; // firestore only
  size(value: number): RebasedCore; // firestore only
  at(value: string | number): RebasedCore;
  after(value: string | number): RebasedCore;
  ref(path: string): RebasedCore; // firebase only

  //
  // utils
  http(transformFn: (config: AxiosRequestConfig) => void): RebasedCore;

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
  include(fields: string[]): RebasedCore;
  doc(value: any): RebasedCore;
  select(value: string[]): RebasedCore;
  master(value: boolean): RebasedCore;
}
