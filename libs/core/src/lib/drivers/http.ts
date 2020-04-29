import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { get, omit, cloneDeep } from 'lodash';
import { from, Observable, PartialObserver } from 'rxjs';
import { ReativeDriver, ReativeDriverOption } from '../interfaces/driver';
import { ReativeOptions } from '../interfaces/options';
import { Response, ResponseSource } from '../interfaces/response';
import { Reative } from '../symbols/reative';
import { Logger } from '../utils/logger';
import { clearNetworkResponse } from '../utils/response';
import { ReativeChainPayload, ReativeChain } from '../interfaces/chain';
import { ReativeVerb } from '../interfaces/verb';

declare var window;
export class HttpDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'http';
  driverOptions: ReativeOptions;
  instance: AxiosInstance;
  logger: Logger;

  public verbs: { [key in ReativeVerb]: string | boolean } = {
    find: 'http.get',
    findOne: 'http.get',
    on: false,
    get: true,
    post: true,
    update: 'http.patch',
    patch: true,
    delete: true,
    set: 'http.post',
    count: false,
    run: false
  };

  public chaining: { [key in ReativeChain]: string | boolean } = {
    driver: true,
    network: true,
    key: true,
    query: false,
    where: false,
    sort: false,
    size: false,
    at: false,
    after: false,
    ref: false,
    raw: true,
    transform: true,
    diff: true,
    http: true,
    include: false,
    doc: false,
    master: false,
    token: false,
    object: false,
    save: 'browser',
    ttl: 'browser',
    state: 'browser',
    cache: 'browser',
    worker: true,
    select: false
  };

  constructor() {}

  getInstance() {
    return this.instance;
  }

  configure(options: ReativeOptions) {
    this.driverOptions = options;
    try {
      if (
        window &&
        window.Worker &&
        options.useWorker === true &&
        !Reative.worker.http
      ) {
        Reative.worker.http = new Worker('/worker/http.js');
      }
    } catch (err) {}
  }

  public log() {
    return this.logger;
  }

  public executeRequest<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    key: string,
    body: any = {},
    chain: ReativeChainPayload
  ): Observable<T> {
    const options: ReativeOptions = {
      ...Reative.options,
      ...this.driverOptions,
      ...chain
    };

    if (chain.useSessionToken) {
      options.httpConfig.headers[
        `Authorization`
      ] = `Bearer ${chain.useSessionToken}`;
    }

    this.instance = axios.create(options.httpConfig);

    const baseURL = options.baseURL || get(options, 'httpConfig.baseURL');
    const endpoint = options.endpoint;
    const collectionName = options.collection;

    //
    // call exceptions
    if (!baseURL) throw new Error(`baseURL needed for [${method}]`);
    if (!endpoint) throw new Error(`endpoint required for [${method}]`);

    //
    // set path to be requestes
    const url = `${baseURL}${endpoint}${path}`;
    return new Observable((observer: PartialObserver<T>) => {
      //
      // error callback
      const error = (r, source: ResponseSource = 'http') => {
        const data =
          source === 'worker' ? get(r, 'error') || r : get(r, 'response.data');

        try {
          if (source === 'worker') {
            Reative.responses[r.key].observer.error(data);
            Reative.responses[r.key].observer.complete();
          } else {
            observer.error(data);
            observer.complete();
          }
        } catch (err) {}
      };

      //
      // success callback
      const success = (r, source: ResponseSource = 'http') => {
        // double check for worker errors
        if (source === 'worker' && r.data.error) {
          return error(r.data, source);
        }

        const data = source === 'worker' ? r.data.data : r.data;
        const dataResponse =
          source === 'worker'
            ? omit(cloneDeep(r.data), [`data`])
            : omit(cloneDeep(r), [`data`]);

        // build standard response
        const response: Response = clearNetworkResponse({
          data: data,
          response: dataResponse,
          key: source === 'worker' ? r.data.key : key,
          collection: collectionName || '',
          driver: this.driverName,
          source: source
        });

        //
        // success callback
        if (source === 'worker') {
          Reative.responses[r.data.key].observer.next(response as T);
          Reative.responses[r.data.key].observer.complete();
        } else {
          observer.next(response as T);
          observer.complete();
        }
      };

      //
      // network handle
      if (
        Reative.worker.http &&
        options.useWorker &&
        chain.useWorker !== false
      ) {
        Reative.responses[key] = {
          key: key,
          observer: observer
        };
        Reative.worker.http.postMessage({
          key: key,
          method: method,
          url: url,
          body: body,
          headers: options.httpConfig.headers
        });
        Reative.worker.http.onmessage = r => success(r, 'worker');
        Reative.worker.http.onerror = r => error(r, 'worker');
      } else {
        switch (method) {
          case 'post':
            from(this.instance.post(url, body))
              .toPromise()
              .then((r: AxiosResponse) => success(r))
              .catch(error);
            break;

          case 'patch':
            from(this.instance.patch(url, body))
              .toPromise()
              .then((r: AxiosResponse) => success(r))
              .catch(error);
            break;

          case 'delete':
            from(this.instance.delete(url, body))
              .toPromise()
              .then((r: AxiosResponse) => success(r))
              .catch(error);
            break;

          default:
            from(this.instance.get(url))
              .toPromise()
              .then((r: AxiosResponse) => success(r))
              .catch(error);
        }
      }
    });
  }

  public get<T>(
    path: string = '',
    key: string = '',
    payload: any,
    chain: ReativeChainPayload
  ): Observable<T> {
    return this.executeRequest('get', path, key, payload, chain);
  }

  public post<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: ReativeChainPayload
  ): Observable<T> {
    return this.executeRequest('post', path, key, payload, chain);
  }

  public patch<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: ReativeChainPayload
  ): Observable<T> {
    return this.executeRequest('patch', path, key, payload, chain);
  }

  public delete<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: ReativeChainPayload
  ): Observable<T> {
    return this.executeRequest('delete', path, key, payload, chain);
  }
}
