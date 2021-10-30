import axios, { AxiosResponse, AxiosInstance } from 'axios';
import lodash from 'lodash';
const { isArray, get } = lodash;
import { from, Observable, PartialObserver } from 'rxjs';
import {
  FlewDriver,
  FlewDriverOption,
  FlewOptions,
  namespace,
  Logger,
  FlewChainPayload,
  FlewChain,
  FlewVerb,
} from '@flew/core';

const workspace = namespace();

export class HttpDriver implements FlewDriver {
  driverName: FlewDriverOption = 'http';
  driverOptions: FlewOptions;
  instance: AxiosInstance;
  logger: Logger;

  public verbs: { [key in FlewVerb]: string | boolean } = {
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
    run: false,
  };

  public chaining: { [key in FlewChain]: string | boolean } = {
    from: true,
    network: true,
    key: true,
    query: false,
    where: true,
    sort: false,
    size: true,
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
    withinMiles: false,
    diff: true,
    response: true,
  };

  constructor() {}

  getInstance() {
    return this.instance;
  }

  configure(options: FlewOptions) {
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
    chain: FlewChainPayload,
  ): Observable<T> {
    const options: FlewOptions = {
      ...workspace.options,
      ...this.driverOptions,
      ...chain,
    };

    if (chain.useSessionToken) {
      options.httpConfig.headers[
        `Authorization`
      ] = `Bearer ${chain.useSessionToken}`;
    }

    this.instance = axios.create(options.httpConfig as any);

    const baseURL = options.baseURL || get(options, 'httpConfig.baseURL');
    const endpoint = options.endpoint;

    //
    // set path to be requestes
    let url = `${baseURL || ''}${endpoint || ''}${options.pathname || ''}${
      path || ''
    }`;

    //
    // set limit
    if (chain.size) {
      url += !url.includes('?') ? '?' : '';
      url += `limit=${chain.size}`;
    }

    //
    // set where
    if (isArray(chain.where)) {
      url += !url.includes('?') ? '?' : '';
      chain.where.forEach(
        (it, i) =>
          (url += `${i > 0 || url.includes('?') ? '&' : ''}${
            it.field
          }${this.translateOperator(it.operator)}${it.value}`),
      );
    }

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
    path = '',
    key = '',
    payload: any,
    chain: FlewChainPayload,
  ): Observable<T> {
    return this.executeRequest('get', path, key, payload, chain);
  }

  public post<T>(
    path = '',
    key = '',
    payload: any = {},
    chain: FlewChainPayload,
  ): Observable<T> {
    return this.executeRequest('post', path, key, payload, chain);
  }

  public patch<T>(
    path = '',
    key = '',
    payload: any = {},
    chain: FlewChainPayload,
  ): Observable<T> {
    return this.executeRequest('patch', path, key, payload, chain);
  }

  public delete<T>(
    path = '',
    key = '',
    payload: any = {},
    chain: FlewChainPayload,
  ): Observable<T> {
    return this.executeRequest('delete', path, key, payload, chain);
  }

  private translateOperator(operator: string) {
    const options = {
      '==': '=',
      '!==': '!=',
    };
    return options[operator] || operator;
  }
}
