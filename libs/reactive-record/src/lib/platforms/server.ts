import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { get, merge, isEmpty, clone, cloneDeep, isBoolean } from 'lodash';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { ReactiveApi } from '../interfaces/api';
import { ReactiveDriver, ReactiveDriverOption } from '../interfaces/driver';
import { Request } from '../interfaces/request';
import { Options, ExtraOptions } from '../interfaces/options';
import { FirestoreDriver } from '../drivers/firestore';
import { FirebaseDriver } from '../drivers/firebase';
import { Response } from '../interfaces/response';
import { StorageAdapter } from '../interfaces/storage';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { Config } from '../symbols/rr';
import { SHA256 } from '../utils/sha';

export class ReactiveRecord implements ReactiveApi {
  protected collection: string;
  protected storage: StorageAdapter;

  private _driver: ReactiveDriverOption = 'firestore';
  private _drivers: {
    // firestore: ReactiveDriver;
    // firebase: ReactiveDriver;
    // http: ReactiveDriver;
  } = {
    firestore: {},
    firebase: {},
    http: {}
  };
  _driver_initialized = {};

  private _http: AxiosInstance;
  private httpConfig: AxiosRequestConfig = {};
  private beforeHttp = (config: AxiosRequestConfig) => {};

  private baseURL: string;
  private endpoint: string;

  private request: Request = {};
  private extraOptions: ExtraOptions = {};

  //
  // subject for handling logs
  public $log: Subject<Log> = new Subject();
  protected _logger: Logger; // instance

  //
  // runtime config
  private _initial_options: Options;
  private _initialized: boolean;

  constructor(options: Options) {
    this._initial_options = options;
  }

  protected init(runtime: Options = {}) {
    //
    // settings that needs runtime evaluation
    const options: Options = { ...this.cloneOptions(), ...runtime };

    if (!this.httpConfig.timeout) this.httpConfig.timeout = 60 * 1000;
    if (!this.httpConfig.baseURL) this.httpConfig.baseURL = options.baseURL;

    this.beforeHttp(this.httpConfig);

    //
    // configure http client
    this._http = axios.create(this.httpConfig);

    //
    // settings initialized once
    if (this._initialized) return;

    //
    // configure logger
    if (!isBoolean(options.useLog)) options.useLog = true;
    if (!isBoolean(options.useLogTrace)) options.useLogTrace = false;
    this._logger = new Logger({
      subject: this.$log,
      useLog: options.useLog,
      useLogTrace: options.useLogTrace
    });

    //
    // set default drivers
    this.driverInit(options);

    //
    // apply class options
    delete options.useLog;
    delete options.useLogTrace;
    delete options.driver;
    merge(this, options);

    //
    // mark as initialized
    this._initialized = true;
  }

  private getDriverInstance(driver: ReactiveDriver & string) {
    if (isEmpty(this._driver_initialized[driver])) {
      const options: Options = this.cloneOptions();
      this.driverInit(options);
    } else {
      this._driver_initialized[driver] = true;
    }
    return this._drivers[driver].connector[driver];
  }

  public firebase() {
    return this.getDriverInstance('firebase');
  }

  public firestore() {
    return this.getDriverInstance('firestore');
  }

  public getDriver(): ReactiveDriverOption {
    return this._driver;
  }

  public reboot() {
    this._initialized = false;
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
  }

  private reset(): void {
    this.request = {};
    this.extraOptions = {};
  }

  private cloneOptions() {
    const consumer: Options = this._initial_options;
    const general: Options = Config.options;
    return { ...general, ...consumer };
  }

  private driverInit(options: Options) {
    this._driver = options.driver || 'firestore';
    this._drivers = {
      firestore: new FirestoreDriver({
        ...{ _logger: this._logger },
        ...options
      }),
      firebase: new FirebaseDriver({
        ...{ _logger: this._logger },
        ...options
      }),
      http: {} // @todo
    };
  }

  private driverException(_driver: string, _method: string) {
    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].find !== 'function'
    )
      throw new Error(`${_driver} driver unavailable for method [${_method}]`);
  }

  public find<T extends Response>(): Observable<T> {
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
    const _request = cloneDeep(this.request);
    const _key = this.createKey();
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();
    this.driverException(currentDriver, 'find');
    return this._drivers[currentDriver].find<T>(_request, _key, _extraOptions);
  }

  public findOne<T extends Response>(): Observable<T> {
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
    const _request = cloneDeep(this.request);
    const _key = this.createKey();
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();
    this.driverException(currentDriver, 'findOne');
    return this._drivers[currentDriver].findOne<T>(
      _request,
      _key,
      _extraOptions
    );
  }

  public set(
    id: string,
    data: any,
    shouldMerge: boolean = true
  ): Observable<any> {
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
    this.reset();
    this.driverException(currentDriver, 'set');
    return this._drivers[currentDriver].set(id, data, shouldMerge);
  }

  public update(id: string, data: any): Observable<any> {
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
    this.reset();
    this.driverException(currentDriver, 'update');
    return this._drivers[currentDriver].update(id, data);
  }

  public on<T>(
    onSuccess: (response: Response) => any = (response: Response) => {},
    onError: (response: any) => any = (response: any) => {}
  ): any {
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();
    this.driverException(currentDriver, 'on');
    return this._drivers[currentDriver].on(
      _request,
      onSuccess,
      onError,
      _extraOptions
    );
  }

  protected createKey(path = '', body = {}): string {
    const extraOptions = this.cloneExtraOptions();
    const requestPath = `${this.collection}:/${this.endpoint || ''}${path ||
      ''}/${SHA256(
      JSON.stringify({
        ...body,
        ...this.request,
        ...{ ref: this.extraOptions.ref || '' },
        ...{ driver: this._driver }
      })
    )}`;
    return extraOptions.key || requestPath.replace('///', '//');
  }

  protected cloneExtraOptions(): ExtraOptions {
    return cloneDeep(this.extraOptions);
  }

  // @todo move to a separate http driver
  private executeRequest<T extends Response>(
    method: 'get' | 'post' | 'patch' | 'delete' = 'get',
    path: string = '/',
    body?: any
  ): Observable<T> {
    //
    // ensure settings have been applied
    const currentDriver = this.getDriver();
    this.init({ driver: currentDriver });

    //
    // call exceptions
    if (!this.baseURL) throw new Error(`baseURL needed for [${method}]`);
    if (!this.endpoint) throw new Error(`endpoint required for [${method}]`);

    //
    // set path to be requestes
    const requestPath = `${this.endpoint}${path}`;

    //
    // define an unique key
    const key = this.createKey(path, body);

    //
    // reset the chain
    this.reset();

    return new Observable((observer: PartialObserver<T>) => {
      //
      // transform response
      const success = async (r: AxiosResponse) => {
        //
        // build standard response
        const response: Response = {
          data: r.data,
          response: r,
          key: key,
          collection: this.collection,
          driver: this._driver
        };
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
          this._http
            .post(requestPath, body)
            .then(success)
            .catch(error);
          break;

        case 'patch':
          this._http
            .patch(requestPath, body)
            .then(success)
            .catch(error);
          break;

        case 'delete':
          this._http
            .delete(requestPath, body)
            .then(success)
            .catch(error);
          break;

        default:
          this._http
            .get(requestPath)
            .then(success)
            .catch(error);
      }
    });
  }

  public get<T extends Response>(path: string = ''): Observable<T> {
    return this.executeRequest('get', path);
  }

  public post<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('post', path, body);
  }

  public patch<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    return this.executeRequest('patch', path, body);
  }

  public delete<T extends Response>(
    path: string = '',
    body?: any
  ): Observable<T> {
    return this.executeRequest('delete', path, body);
  }

  /**
   * Set current driver
   */
  public driver(name: ReactiveDriverOption): ReactiveRecord {
    this._driver = name;
    return this;
  }

  /**
   * Set current driver
   */
  public http(fn: (config: AxiosRequestConfig) => void): ReactiveRecord {
    this.beforeHttp = fn;
    return this;
  }

  /**
   * Set whether to use network for first requests
   */
  public useNetwork(active: boolean): ReactiveRecord {
    this.extraOptions.useNetwork = active;
    return this;
  }

  /**
   * Set whether to cache network responses
   */
  public saveNetwork(active: boolean): ReactiveRecord {
    this.extraOptions.saveNetwork = active;
    return this;
  }

  /**
   * Set a transform fn for the responses
   */
  public transformResponse<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.extraOptions.transformResponse = transformFn;
    return this;
  }

  public transformNetwork<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.transformResponse(transformFn);
    return this;
  }

  /**
   * Set cache time to live
   */
  public ttl(value: number): ReactiveRecord {
    this.extraOptions.ttl = value;
    return this;
  }

  /**
   * Set whether to use cache for first requests
   */
  public useCache(active: boolean): ReactiveRecord {
    this.extraOptions.useCache = active;
    return this;
  }

  /**
   * Set transform fn for cache
   */
  public transformCache<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.extraOptions.transformCache = transformFn;
    return this;
  }

  /**
   * Set cache key
   */
  public key(name: string): ReactiveRecord {
    this.extraOptions.key = name;
    return this;
  }

  /**
   * Set request query
   */
  public query(
    by: { [key: string]: {} } | { [key: string]: {} }[]
  ): ReactiveRecord {
    this.request.query = by;
    return this;
  }

  /**
   * Set request where
   */
  public where(
    field: string,
    operator: string,
    value: string | number | boolean
  ): ReactiveRecord {
    if (isEmpty(this.request.query)) {
      this.request.query = [];
    }
    this.request.query.push({
      field: field,
      operator: operator,
      value: value
    });
    return this;
  }

  /**
   * Set request sort
   */
  public sort(by: { [key: string]: string }): ReactiveRecord {
    if (isEmpty(this.request.sort)) {
      this.request.sort = {};
    }
    for (const k in by) {
      this.request.sort[k] = by[k];
    }
    return this;
  }

  /**
   * Set request size
   */
  public size(value: number): ReactiveRecord {
    this.request.size = value;
    return this;
  }

  /**
   * Set reference (for firebase)
   */
  public ref(path: string): ReactiveRecord {
    this.extraOptions.ref = path;
    return this;
  }

  public data(transform: boolean): ReactiveRecord {
    this.extraOptions.transformData = transform;
    return this;
  }

  /**
   * Clear browser cache
   */
  public clearCache(): void {}

  public useLog(active: boolean): ReactiveRecord {
    this._logger.enabled(active);
    return this;
  }

  public useLogTrace(active: boolean): ReactiveRecord {
    this._logger.traced(active);
    return this;
  }

  protected log(): Logger {
    return this._logger;
  }

  /**
   * Feed store with cached responses
   */
  public feed(): void {}
}

export class PlatformServer extends ReactiveRecord {}
