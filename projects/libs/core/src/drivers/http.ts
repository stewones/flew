import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { get } from 'lodash';
import { from, Observable, PartialObserver } from 'rxjs';
import { RebasedDriver, RebasedDriverOption } from '../interfaces/driver';
import { RebasedOptions } from '../interfaces/options';
import { Rebased } from '../symbols/rebased';
import { Logger } from '../effects/logger';
import { RebasedChainPayload, RebasedChain } from '../interfaces/chain';
import { RebasedVerb } from '../interfaces/verb';

declare var window;
export class HttpDriver implements RebasedDriver {
  driverName: RebasedDriverOption = 'http';
  driverOptions: RebasedOptions;
  instance: AxiosInstance;
  logger: Logger;

  public verbs: { [key in RebasedVerb]: string | boolean } = {
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

  public chaining: { [key in RebasedChain]: string | boolean } = {
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
    http: true,
    include: false,
    doc: false,
    master: false,
    token: false,
    object: false,
    cache: 'browser',
    select: false,
    state: true,
    near: false,
    withinKilometers: false,
    withinMiles: false
  };

  constructor() {}

  getInstance() {
    return this.instance;
  }

  configure(options: RebasedOptions) {
    this.driverOptions = options;
  }

  public log() {
    return this.logger;
  }

  public executeRequest<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    key: string,
    body: any = {},
    chain: RebasedChainPayload
  ): Observable<T> {
    const options: RebasedOptions = {
      ...Rebased.options,
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

    //
    // set path to be requestes
    const url = `${baseURL || ''}${endpoint || ''}${options.pathname ||
      ''}${path || ''}`;
    return new Observable((observer: PartialObserver<T>) => {
      //
      // error callback
      const error = r => {
        observer.error(r);
        observer.complete();
      };

      //
      // success callback
      const success = r => {
        observer.next(r && (r.data as T));
        observer.complete();
      };

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
    });
  }

  public get<T>(
    path: string = '',
    key: string = '',
    payload: any,
    chain: RebasedChainPayload
  ): Observable<T> {
    return this.executeRequest('get', path, key, payload, chain);
  }

  public post<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: RebasedChainPayload
  ): Observable<T> {
    return this.executeRequest('post', path, key, payload, chain);
  }

  public patch<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: RebasedChainPayload
  ): Observable<T> {
    return this.executeRequest('patch', path, key, payload, chain);
  }

  public delete<T>(
    path: string = '',
    key: string = '',
    payload: any = {},
    chain: RebasedChainPayload
  ): Observable<T> {
    return this.executeRequest('delete', path, key, payload, chain);
  }
}
