import { RRRequest } from './rr-request';
import { RRExtraOptions } from './rr-extra-options';
import { RRResponse } from './rr-response';
import { Observable } from 'rxjs';

/**
 * Public RR Api
 *
 * @export
 * @interface RRApi
 */
export interface RRApi {
  //
  // chaining
  driver(name: string);
  useNetwork(active: boolean);
  saveNetwork(active: boolean);
  transformNetwork(transformFn: (response: RRResponse) => any);
  ttl(value: number);
  useCache(active: boolean);
  transformCache(transformFn: (response: RRResponse) => any);
  key(name: string);
  query(by: { [key: string]: {} });
  where(field: string, operator: string, value: string | number);
  sort(by: { [key: string]: string });
  size(value: number);

  //
  // data
  find(): Observable<RRResponse>;
  findOne(): Observable<RRResponse>;
  set(id: string, data: any, merge?: boolean): Observable<any>;
  update(id: string, data: any): Observable<any>;
  on(
    onSuccess: (response: RRResponse | any) => any,
    onError: (response: any) => any
  ): any;

  //
  // http
  get(path: string): Observable<RRResponse>;
  post(path: string, body: any): Observable<RRResponse>;
  patch(path: string, body: any): Observable<RRResponse>;
}
