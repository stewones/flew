import axios, { AxiosResponse } from 'axios';
import { get, isObject } from 'lodash';
import { from, Observable, PartialObserver } from 'rxjs';
import { ConnectorHttp } from '../interfaces/connector';
import { ReativeDriver, ReativeDriverOption } from '../interfaces/driver';
import { ReativeOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { Reative } from '../symbols/reative';
import { Logger } from '../utils/logger';
import { clearNetworkResponse } from '../utils/response';

export class HttpDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'http';
  driverOptions: ReativeOptions;
  connector: ConnectorHttp;
  logger: Logger;

  constructor(options: ReativeOptions) {
    this.connector = Reative.connector.http;
    this.configure(options);
  }

  public configure(options: ReativeOptions) {
    //
    // configure http client
    this.driverOptions = options;
    this.connector = axios.create(options.httpConfig);
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
    const baseURL =
      this.driverOptions.baseURL ||
      get(this.driverOptions, 'httpConfig.baseURL');
    const endpoint = this.driverOptions.endpoint;
    const collectionName = this.driverOptions.collection;

    //
    // call exceptions
    if (!baseURL) throw new Error(`baseURL needed for [${method}]`);
    if (!endpoint) throw new Error(`endpoint required for [${method}]`);

    //
    // set path to be requestes
    const requestPath = `${baseURL}${endpoint}${path}`;

    return new Observable((observer: PartialObserver<T>) => {
      //
      // success callback
      const success = async (r: AxiosResponse) => {
        // build standard response
        const response: Response = clearNetworkResponse({
          data: r.data ? r.data : r,
          response: isObject(r) ? r : {},
          key: key,
          collection: collectionName || '',
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
