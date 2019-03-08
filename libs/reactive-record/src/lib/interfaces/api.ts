import { Response } from './response';
import { Observable } from 'rxjs';

/**
 * Public RR Api
 *
 * @export
 * @interface Api
 */
export interface Api {
  //
  // chaining
  driver(name: string);
  useNetwork(active: boolean);
  saveNetwork(active: boolean);
  transformNetwork(transformFn: (response: Response) => any);
  ttl(value: number);
  useCache(active: boolean);
  transformCache(transformFn: (response: Response) => any);
  key(name: string);
  query(by: { [key: string]: {} } | { [key: string]: {} }[]);
  where(field: string, operator: string, value: string | number | boolean);
  sort(by: { [key: string]: string });
  size(value: number);
  ref(path: string);

  //
  // data
  find(): Observable<Response>;
  findOne(): Observable<Response>;
  set(id: string, data: any, merge?: boolean): Observable<any>;
  update(id: string, data: any): Observable<any>;
  on(
    onSuccess: (response: Response | any) => any,
    onError: (response: any) => any
  ): any;

  //
  // http
  get(path: string): Observable<Response>;
  post(path: string, body: any): Observable<Response>;
  patch(path: string, body: any): Observable<Response>;
  delete(path: string): Observable<Response>;
}
