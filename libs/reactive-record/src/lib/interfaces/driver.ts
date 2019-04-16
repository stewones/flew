import { Observable } from 'rxjs';
import { Response } from './response';
import { Request } from './request';
import { Connector } from './connector';
import { ExtraOptions } from './options';

export type ReactiveDriverOption = 'http' | 'firebase' | 'firestore';

//
// @todo fix the typing issues
export interface ReactiveDriver<T = any> {
  connector?: Connector;
  timestamp?: boolean;
  //
  // fire requests

  find?<T extends Response>(
    request: Request,
    key: string,
    extraOptions?: ExtraOptions
  ): Observable<T>;
  // find?<T extends Response>(
  //   request: Request,
  //   extraOptions?: ExtraOptions
  // ): Observable<T>;
  // find?<T extends Response>(): Observable<T>;

  findOne?(): Observable<Response>; // firestore & firebase
  set?(id: string, data: any, merge?: boolean): Observable<any>; // firestore
  update?(id: string, data: any): Observable<any>; // firestore
  on?( // firestore & firebase - real time calls doesn't has caching features
    onSuccess: (response: Response | any) => any,
    onError: (response: any) => any
  ): any;

  //
  // http requests
  get?(path: string): Observable<Response>;
  post?(path: string, body: any): Observable<Response>;
  patch?(path: string, body: any): Observable<Response>;
  delete?(path: string, body?: any): Observable<Response>;
}
