import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { get, merge, isEmpty, clone, cloneDeep, isBoolean } from 'lodash';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { Hooks } from '../hooks/hooks';
import { Api } from '../interfaces/api';
import { Driver } from '../interfaces/driver';
import { Request } from '../interfaces/request';
import { ExtraOptions } from '../interfaces/extra-options';
import { Options } from '../interfaces/options';
import { FirestoreDriver } from '../drivers/firestore';
import { FirebaseDriver } from '../drivers/firebase';
import { Response } from '../interfaces/response';
import { StorageAdapter } from '../interfaces/storage-adapter';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { Config } from '../symbols/rr';

export class ReactiveRecord extends Hooks implements Api {
  public collection: string;
  public storage: StorageAdapter;

  //
  // default params
  private _driver = 'firestore';
  private _drivers: {
    firestore: Driver;
    firebase: Driver | any;
  };

  private http: AxiosInstance;
  public baseURL: string;
  private endpoint: string;

  private request: Request = {};
  private extraOptions: ExtraOptions = {};

  //
  // for unit test
  _observer: PartialObserver<any>;

  //
  // subject for handling logs
  public $log: Subject<Log> = new Subject();
  protected _logger: Logger;

  //
  // for reconfigure
  _options: Options;
  _prevent_config_apply: boolean;

  /**
   * Creates an instance for RR
   * @param { Options } options
   * @memberof RR
   */
  constructor(options: Options) {
    super(options); // provide the hook config
    this._options = options;
  }

  /**
   * Configure http client
   * @todo make this a separate driver
   */
  public httpSetup() {
    const config: AxiosRequestConfig = {
      timeout: 60 * 1000,
      headers: {},
      baseURL: this.baseURL
    };
    this.runHook('http.pre', config);
    this.http = axios.create(config);
  }

  private applyConfig() {
    if (this._prevent_config_apply) return;

    const consumer: Options = this._options;
    const config: Options = Config.options;
    const options: Options = { ...config, ...consumer };

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
    // apply class options
    this._driver = options.driver || 'firestore';
    delete options.useLog;
    delete options.useLogTrace;
    delete options.driver;
    merge(this, options);

    //
    // configure http client
    this.httpSetup();

    //
    // set default drivers
    this._drivers = {
      firestore: new FirestoreDriver({
        ...{ _logger: this._logger },
        ...options
      }),
      firebase: new FirebaseDriver({
        ...{ _logger: this._logger },
        ...options
      })
    };

    this._prevent_config_apply = true;
  }

  /**
   * Reset RR chaining
   */
  private reset(): void {
    this.request = {};
    this.extraOptions = {};
  }

  private driverException(_driver: string, _method: string) {
    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].find !== 'function'
    )
      throw new Error(`${_driver} driver unavailable for method [${_method}]`);
  }

  public find<T extends Response>(): Observable<T> {
    this.applyConfig();
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();
    this.driverException(_driver, 'find');
    return this._drivers[_driver].find<T>(_request, _extraOptions);
  }

  public findOne<T extends Response>(): Observable<T> {
    this.applyConfig();
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();
    this.driverException(_driver, 'findOne');
    return this._drivers[_driver].findOne<T>(_request, _extraOptions);
  }

  public set(
    id: string,
    data: any,
    shouldMerge: boolean = true
  ): Observable<any> {
    this.applyConfig();
    const _driver = clone(this._driver);
    this.reset();
    this.driverException(_driver, 'set');
    return this._drivers[_driver].set(id, data, shouldMerge);
  }

  public update(id: string, data: any): Observable<any> {
    this.applyConfig();
    const _driver = clone(this._driver);
    this.reset();
    this.driverException(_driver, 'update');
    return this._drivers[_driver].update(id, data);
  }

  public on<T>(
    onSuccess: (response: Response) => any = (response: Response) => {},
    onError: (response: any) => any = (response: any) => {}
  ): any {
    this.applyConfig();
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();
    this.driverException(_driver, 'on');
    return this._drivers[_driver].on(
      _request,
      onSuccess,
      onError,
      _extraOptions
    );
  }

  public get<T extends Response>(path: string = ''): Observable<T> {
    this.applyConfig();
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();
    return new Observable((observer: PartialObserver<T>) => {
      //
      // call exceptions
      if (!this.baseURL) throw new Error('baseURL needed for [get]');
      if (!this.endpoint) throw new Error('endpoint required for [get]');

      //
      // re-apply http stuff
      this.httpSetup();

      //
      // set path to be requestes
      const requestPath = `${this.endpoint}${path}`;

      //
      // define an unique key
      const key = _extraOptions.key || requestPath;

      //
      // for unit test
      this._observer = observer;

      //
      // network handle
      const network = () => {
        this.http
          .get(requestPath)
          .then(async (r: AxiosResponse) => {
            //
            // build standard response
            const response: Response = {
              data: r.data,
              response: r,
              key: key
            };

            //
            // check availability
            if (this.hasHook('http.get.after')) {
              //
              // run client hook
              this.hasHook('http.get.after')(
                key,
                response,
                observer,
                _extraOptions
              );
            } else {
              //
              // success callback
              observer.next(response as T);
              observer.complete();
            }
          })
          .catch(err => {
            const errData = get(err, 'response.data');
            //
            // error callback
            observer.error(errData ? errData : err);
            observer.complete();
          });
      };
      //
      // get before hook
      const hookFn = this.hasHook('http.get.before');
      //
      // check availability
      if (hookFn) {
        // console.log('no useNetwork but has hook');
        //
        // run client hook
        hookFn(key, observer, _extraOptions).then(canRequest => {
          this.log().success()(`should it request network? ${canRequest}`);
          //
          // http.get.before should return a boolean
          if (canRequest) network();
        });
      } else {
        // console.log('yes useNetwork but has NOT hook');
        //
        // otherwise
        network();
      }
    });
  }

  public post<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    this.applyConfig();
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();

    return new Observable((observer: PartialObserver<T>) => {
      //
      // call exceptions
      if (!this.baseURL) throw new Error('baseURL needed for [post]');
      if (!this.endpoint) throw new Error('endpoint required for [post]');

      //
      // re-apply http stuff
      this.httpSetup();

      //
      // set path to be requestes
      const requestPath: string = `${this.endpoint}${path}`;

      //
      // define an unique key
      const key = _extraOptions.key || requestPath + `/${JSON.stringify(body)}`;

      //
      // for unit test
      this._observer = observer;

      //
      // network handle
      const network = () => {
        this.http
          .post(requestPath, body)
          .then(async (r: AxiosResponse) => {
            //
            // build standard response
            const response: Response = {
              data: r.data,
              response: r,
              key: key
            };

            //
            // check availability
            if (this.hasHook('http.get.after')) {
              //
              // run client hook
              this.hasHook('http.get.after')(
                key,
                response,
                observer,
                _extraOptions
              );
            } else {
              // console.log('NO HOOK');
              //
              // success callback
              observer.next(response as T);
              observer.complete();
            }
          })
          .catch(err => {
            const errData = get(err, 'response.data');
            //
            // error callback
            observer.error(errData ? errData : err);
            observer.complete();
          });
      };
      //
      // get before hook
      const hookFn = this.hasHook('http.post.before');
      //
      // check availability
      if (hookFn) {
        //
        // run client hook
        hookFn(key, observer, _extraOptions).then(canRequest => {
          //
          // http.get.before should return a boolean
          if (canRequest) network();
        });
      } else {
        //
        // otherwise
        network();
      }
    });
  }

  public patch<T extends Response>(
    path: string = '',
    body: any = {}
  ): Observable<T> {
    this.applyConfig();
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();

    return new Observable((observer: PartialObserver<T>) => {
      //
      // call exceptions
      if (!this.baseURL) throw new Error('baseURL needed for [patch]');
      if (!this.endpoint) throw new Error('endpoint required for [patch]');

      //
      // re-apply http stuff
      this.httpSetup();

      //
      // set path to be requestes
      const requestPath: string = `${this.endpoint}${path}`;

      //
      // define an unique key
      const key = _extraOptions.key || requestPath + `/${JSON.stringify(body)}`;

      //
      // for unit test
      this._observer = observer;

      //
      // network handle
      const network = () => {
        this.http
          .patch(requestPath, body)
          .then(async (r: AxiosResponse) => {
            //
            // build standard response
            const response: Response = {
              data: r.data,
              response: r,
              key: key
            };
            //
            // check availability
            if (this.hasHook('http.get.after')) {
              //
              // run client hook
              this.hasHook('http.get.after')(
                key,
                response,
                observer,
                _extraOptions
              );
            } else {
              //
              // success callback
              observer.next(response as T);
              observer.complete();
            }
          })
          .catch(err => {
            const errData = get(err, 'response.data');
            //
            // error callback
            observer.error(errData ? errData : err);
            observer.complete();
          });
      };
      //
      // get before hook
      const hookFn = this.hasHook('http.patch.before');
      //
      // check availability
      if (hookFn) {
        //
        // run client hook
        hookFn(key, observer, _extraOptions).then(canRequest => {
          //
          // http.get.before should return a boolean
          if (canRequest) network();
        });
      } else {
        //
        // otherwise
        network();
      }
    });
  }

  public delete<T extends Response>(path: string = ''): Observable<T> {
    this.applyConfig();
    this.reset();
    return new Observable((observer: PartialObserver<T>) => {
      //
      // call exceptions
      if (!this.baseURL) throw new Error('baseURL needed for [delete]');
      if (!this.endpoint) throw new Error('endpoint required for [delete]');

      //
      // re-apply http stuff
      this.httpSetup();

      //
      // set path to be requestes
      const requestPath: string = `${this.endpoint}${path}`;

      //
      // for unit test
      this._observer = observer;

      //
      // network handle
      const network = () => {
        this.http
          .delete(requestPath)
          .then(async (r: AxiosResponse) => {
            //
            // build standard response
            const response: Response = {
              data: r.data,
              response: r
            };

            //
            // success callback
            observer.next(response as T);
            observer.complete();
          })
          .catch(err => {
            const errData = get(err, 'response.data');
            //
            // error callback
            observer.error(errData ? errData : err);
            observer.complete();
          });
      };

      //
      // otherwise
      network();
    });
  }

  /**
   * Set current driver
   */
  public driver(name: string): ReactiveRecord {
    this._driver = name;
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

  /**
   *
   */
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
   * Set reference
   */
  public ref(path: string): ReactiveRecord {
    this.extraOptions.ref = path;
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
