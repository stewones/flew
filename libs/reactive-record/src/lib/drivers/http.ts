import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, PartialObserver, from } from 'rxjs';
import { merge, get, isEmpty, isObject } from 'lodash';
import { Connector } from '../interfaces/connector';
import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { Logger } from '../utils/logger';
import { ReactiveDriverOption, ReactiveDriver } from '../interfaces/driver';
import { clearNetworkResponse } from '../utils/response';

export class HttpDriver implements ReactiveDriver {
  _driver: ReactiveDriverOption = 'http';
  collection: string;
  connector: Connector = {};
  logger: Logger;

  private baseURL: string;
  private endpoint: string;
  private httpConfig: AxiosRequestConfig = {};

  constructor(options: Options) {
    merge(this, options);
    this.connector = options.connector.http;

    if (isEmpty(this.connector)) {
      //
      // configure http client
      this.connector = axios.create(this.httpConfig);
    }
  }

  public log() {
    return this.logger;
  }

  public executeRequest<T extends Response>(
    method: 'get' | 'post' | 'patch' | 'delete' = 'get',
    path: string = '/',
    key: string,
    body?: any
  ): Observable<T> {
    //
    // call exceptions
    if (!this.baseURL) throw new Error(`baseURL needed for [${method}]`);
    if (!this.endpoint) throw new Error(`endpoint required for [${method}]`);

    //
    // set path to be requestes
    const baseURL = this.httpConfig.baseURL || this.baseURL;
    let requestPath = `${this.endpoint}${path}`;

    if (requestPath[0] === '/' || requestPath[0] !== 'h')
      requestPath = baseURL + requestPath;

    return new Observable((observer: PartialObserver<T>) => {
      //
      // transform response
      const success = async (r: AxiosResponse) => {
        // build standard response
        const response: Response = clearNetworkResponse({
          data: r.data ? r.data : r,
          response: isObject(r) ? r : {},
          key: key,
          collection: this.collection,
          driver: this._driver
        });

        //
        //
        // success callback
        observer.next(response as T);
        observer.complete();
      };

      const error = err => {
        const errData = get(err, 'response.data');
        //
        // error callback
        observer.error(errData ? errData : err);
        observer.complete();
      };

      //
      // network handle
      switch (method) {
        case 'post':
          from(this.connector.post(requestPath, body))
            .toPromise()
            .then(success)
            .catch(error);
          break;

        case 'patch':
          from(this.connector.patch(requestPath, body))
            .toPromise()
            .then(success)
            .catch(error);
          break;

        case 'delete':
          from(this.connector.delete(requestPath, body))
            .toPromise()
            .then(success)
            .catch(error);
          break;

        default:
          from(this.connector.get(requestPath))
            .toPromise()
            .then(success)
            .catch(error);
      }
    });
  }

  public get<T extends Response>(
    path: string = '',
    key: string = ''
  ): Observable<T> {
    return this.executeRequest('get', path, key);
  }

  public post<T extends Response>(
    path: string = '',
    key: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('post', path, key, body);
  }

  public patch<T extends Response>(
    path: string = '',
    key: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('patch', path, key, body);
  }

  public delete<T extends Response>(
    path: string = '',
    key: string = '',
    body?: any
  ): Observable<T> {
    return this.executeRequest('delete', path, key, body);
  }
}
