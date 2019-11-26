import axios, { AxiosResponse } from 'axios';
import { Observable, PartialObserver, from } from 'rxjs';
import { get, isEmpty, isObject } from 'lodash';
import { ConnectorHttp } from '../interfaces/connector';
import { ReativeOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { Logger } from '../utils/logger';
import { ReativeDriverOption, ReativeDriver } from '../interfaces/driver';
import { clearNetworkResponse } from '../utils/response';
import { Reative } from '../symbols/reative';

export class HttpDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'http';
  driverOptions: ReativeOptions;
  connector: ConnectorHttp;
  logger: Logger;

  constructor(options: ReativeOptions) {
    this.driverOptions = options;
    this.connector = Reative.connector.http;

    if (isEmpty(this.connector)) {
      //
      // configure http client
      this.connector = axios.create(options.httpConfig);
    }
  }

  public log() {
    return this.logger;
  }

  public executeRequest<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    key: string,
    body?: any
  ): Observable<T> {
    //
    // call exceptions
    if (!this.driverOptions.baseURL)
      throw new Error(`baseURL needed for [${method}]`);
    if (!this.driverOptions.endpoint)
      throw new Error(`endpoint required for [${method}]`);

    //
    // set path to be requestes
    const baseURL =
      this.driverOptions.httpConfig.baseURL || this.driverOptions.baseURL;
    const requestPath = `${baseURL}${this.driverOptions.endpoint}${path}`;

    return new Observable((observer: PartialObserver<T>) => {
      //
      // success callback
      const success = async (r: AxiosResponse) => {
        // build standard response
        const response: Response = clearNetworkResponse({
          data: r.data ? r.data : r,
          response: isObject(r) ? r : {},
          key: key,
          collection: this.driverOptions.collection || '',
          driver: this.driverName
        });

        //
        //
        // success callback
        observer.next(response as T);
        observer.complete();
      };

      //
      // error callback
      const error = err => {
        const errData = get(err, 'response.data');
        try {
          observer.error(errData ? errData : err);
          observer.complete();
        } catch (err) {}
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

  public get<T>(path: string = '', key: string = ''): Observable<T> {
    return this.executeRequest('get', path, key);
  }

  public post<T>(
    path: string = '',
    key: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('post', path, key, body);
  }

  public patch<T>(
    path: string = '',
    key: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('patch', path, key, body);
  }

  public delete<T>(
    path: string = '',
    key: string = '',
    body?: any
  ): Observable<T> {
    return this.executeRequest('delete', path, key, body);
  }
}
