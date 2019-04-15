import { Observable } from 'rxjs';
import { ExtraOptions } from './extra-options';
import { Response } from './response';
import { Request } from './request';
import { Connector } from './connector';

export interface ReactiveDriver {
  connector: Connector;
  timestamp: boolean;
  //
  // fire requests
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
