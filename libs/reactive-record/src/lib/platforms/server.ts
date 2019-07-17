// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
  merge,
  isEmpty,
  isArray,
  isBoolean,
  isString,
  startCase,
  omit
} from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Response } from '../interfaces/response';
import { Options } from '../interfaces/options';
import { ReactiveApi } from '../interfaces/api';
import { ReactiveVerb } from '../interfaces/verb';
import { ReactiveDriverOption, ReactiveDriver } from '../interfaces/driver';
import { StorageAdapter } from '../interfaces/storage';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { Config } from '../symbols/rr';
import { FirestoreDriver } from '../drivers/firestore';
import { FirebaseDriver } from '../drivers/firebase';
import { HttpDriver } from '../drivers/http';
import { RR_VERSION } from '../version';
import { RR_DRIVER } from '../driver';
import { SHA256 } from '../utils/sha';
import { Chain } from '../interfaces/chain';
export class ReactiveRecord implements ReactiveApi {
  protected collection: string;
  protected endpoint: string;
  protected _storage: StorageAdapter;

  private httpConfig: AxiosRequestConfig = {};
  private beforeHttp = (config: AxiosRequestConfig) => {};

  private chain: Chain = {};

  private _driver_initialized = {};
  private _driver: ReactiveDriverOption = RR_DRIVER;
  private _drivers: {
    firestore: ReactiveDriver;
    firebase: ReactiveDriver;
    http: ReactiveDriver;
  } = {
    firestore: {} as ReactiveDriver,
    firebase: {} as ReactiveDriver,
    http: {} as ReactiveDriver
  };

  public $log: Subject<Log> = new Subject();
  public $ready: Subject<void> = new Subject();

  protected logger: Logger; // instance

  //
  // runtime setup
  private _initial_options: Options = {};
  private _initialized: boolean;

  //
  // verbs
  private verbs = {
    firestore: {
      find: true,
      findOne: true,
      on: true,
      get: 'http.get',
      post: 'http.post',
      update: true,
      patch: 'http.patch',
      delete: 'http.delete',
      set: true
    },
    firebase: {
      find: true,
      findOne: true,
      on: true,
      get: 'http.get',
      post: 'http.post',
      update: 'http.patch',
      patch: 'http.patch',
      delete: 'http.delete',
      set: 'http.post'
    },
    http: {
      find: 'http.get',
      findOne: 'http.get',
      on: false,
      get: true,
      post: true,
      update: 'http.patch',
      patch: true,
      delete: true,
      set: 'http.post'
    }
  };

  constructor(options: Options) {
    this._initial_options = { ...options };
  }

  public init(runtime: Options = {}) {
    //
    // settings that needs runtime evaluation
    const options: Options & any = { ...this.cloneOptions(), ...runtime };

    if (!this.httpConfig.timeout) this.httpConfig.timeout = 60 * 1000;
    if (!this.httpConfig.baseURL) this.httpConfig.baseURL = options.baseURL;
    if (!this.httpConfig.headers) this.httpConfig.headers = {};

    //
    // configure http client
    this.driverHttpReload(options);

    //
    // set use cache
    if (!options.chain) options.chain = {};
    options.chain.useCache = options.useCache === false ? false : true;

    //
    // set storage
    if (options.storage) options._storage = options.storage;

    //
    // settings initialized once
    if (this._initialized) return;

    //
    // configure logger
    if (!isBoolean(options.useLog)) options.useLog = true;
    if (!isBoolean(options.useLogTrace)) options.useLogTrace = false;
    this.logger = new Logger({
      subject: this.$log,
      useLog: options.useLog,
      useLogTrace: options.useLogTrace
    });

    //
    // set default drivers
    this.driverInit(options);

    //
    // apply class options
    merge(this, this.clearOptions(options));

    //
    // mark as initialized
    this._initialized = true;

    this.$ready.next();
    this.$ready.complete();

    const name = this.collection || this.endpoint;

    this.log().success()(
      `Collection ${startCase(name)} initiated @ RR ${RR_VERSION}`
    );
  }

  protected clearOptions(options) {
    const newOptions = { ...options };
    delete newOptions.useCache;
    delete newOptions.useLog;
    delete newOptions.useLogTrace;
    delete newOptions.driver;
    delete newOptions.storage;
    return newOptions;
  }

  public firebase() {
    return this.getConnector('firebase');
  }

  public firestore() {
    return this.getConnector('firestore');
  }

  public storage(): StorageAdapter {
    return this._storage;
  }

  public isOnline(): any {}

  /**
   * Clear browser cache
   */
  public clearCache(): void {}

  /**
   * Feed store with cached responses
   */
  public feed(): void {}

  protected log(): Logger {
    return this.logger;
  }

  protected getDriver(): ReactiveDriverOption {
    return this._driver;
  }

  private getConnector(driver) {
    if (!this._driver_initialized[driver]) {
      const options: Options = this.cloneOptions();
      this.driverInit(options);
      this._driver_initialized[driver] = true;
    }

    return this._drivers[driver].connector;
  }

  private _reset(): void {
    // this.driver(RR_DRIVER);
    this.chain = {};
  }

  private cloneOptions() {
    const consumer: Options = this._initial_options;
    const general: Options = Config.options;
    return { ...general, ...consumer };
  }

  private driverInit(options: Options) {
    if (!options.chain) options.chain = {};
    this._driver = this._initial_options.driver || options.driver || RR_DRIVER;
    this._drivers = {
      firestore: new FirestoreDriver({
        ...{ logger: this.logger },
        ...options
      }),
      firebase: new FirebaseDriver({
        ...{ logger: this.logger },
        ...options
      }),
      http: new HttpDriver({
        ...{ logger: this.logger },
        ...options,
        ...{ httpConfig: this.httpConfig }
      })
    };
  }

  private driverHttpReload(options: Options) {
    this.beforeHttp(this.httpConfig);
    this._drivers.http = new HttpDriver({
      ...{ logger: this.logger },
      ...options,
      ...{ httpConfig: this.httpConfig }
    });
  }

  private getVerbOrException(_driver: string, _verb: string): ReactiveVerb {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = this.verbs[_driver][_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
  }

  public useLog(active: boolean): ReactiveRecord {
    this.logger.enabled(active);
    return this;
  }

  public useLogTrace(active: boolean): ReactiveRecord {
    this.logger.traced(active);
    return this;
  }

  public find<T>(): Observable<T> {
    return this.call<T>('find');
  }

  public findOne<T>(): Observable<T> {
    return this.call<T>('findOne');
  }

  public set(
    id: string,
    data: any,
    shouldMerge: boolean = true
  ): Observable<any> {
    return this.call('set', null, {
      id: id,
      data: data,
      shouldMerge: shouldMerge
    });
  }

  public update(id: string, data: any): Observable<any> {
    return this.call('update', null, {
      id: id,
      data: data
    });
  }

  public on<T>(): Observable<T> {
    return this.call<T>('on');
  }

  protected createKey(verb, path, body): string {
    const chain = this.cloneChain();
    const payload = JSON.stringify({
      ...verb,
      ...body,
      ...{ path: path },
      ...{ driver: this._driver },
      ...omit(chain, [
        'ttl',
        'key',
        'useCache',
        'useNetwork',
        'transform',
        'transformCache',
        'transformResponse',
        'transformNetwork'
      ])
    });
    const key = `${this.collection || 'rr'}:/${this.endpoint || ''}${path ||
      ''}/${SHA256(payload)}`;
    return chain.key || key.split('///').join('//');
  }

  protected cloneChain(): Chain {
    return { ...this.chain };
  }

  protected call<T>(
    method: ReactiveVerb,
    path: string = '',
    payload: any = {},
    chain = this.cloneChain(),
    key: string = ''
  ): Observable<T> {
    let _verb = method;
    let _driver = this.getDriver();
    let arg1, arg2, arg3;

    //
    // get verb
    const verb = this.getVerbOrException(_driver, _verb);

    if (isString(verb)) {
      _driver = verb.split('.')[0] as ReactiveDriverOption;
      _verb = verb.split('.')[1] as ReactiveVerb;
    }

    //
    // run exception for new variables
    this.getVerbOrException(_driver, _verb);

    //
    // init rr
    this.init({ driver: _driver });

    //
    // define an unique key
    key = key ? key : this.createKey(_verb, path, payload);

    //
    // reset the chain
    this._reset();

    //
    // define arguments
    switch (_verb) {
      case 'find':
      case 'findOne':
        arg1 = chain;
        arg2 = key;
        break;
      case 'set':
      case 'update':
        arg1 = payload.id;
        arg2 = payload.data;
        arg3 = payload.shouldMerge;
        break;
      case 'on':
        arg1 = chain;
        arg2 = key;
        break;
      default:
        arg1 = path;
        arg2 = key;
        arg3 = payload;
    }

    //
    // execute request
    return this._drivers[_driver][_verb]<T>(arg1, arg2, arg3);
  }

  public get<T>(path: string = ''): Observable<T> {
    return this.call<T>('get', path);
  }

  public post<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call<T>('post', path, body);
  }

  public patch<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call<T>('patch', path, body);
  }

  public delete<T>(path: string = '', body?: any): Observable<T> {
    return this.call<T>('delete', path, body);
  }

  /**
   * Getter / Setter for the current driver
   */
  public driver(name?: ReactiveDriverOption): ReactiveRecord {
    if (name) {
      this._driver = name;
      return this;
    }
    return this.getDriver() as any;
  }

  public http(fn: (config: AxiosRequestConfig) => void): ReactiveRecord {
    this.beforeHttp = fn;
    return this;
  }

  /**
   * Set whether to use network for first requests
   */
  public network(active: boolean): ReactiveRecord {
    this.chain.useNetwork = active;
    return this;
  }

  /**
   * @deprecated
   * use just `network` instead
   */
  public useNetwork(active: boolean): ReactiveRecord {
    this.network(active);
    return this;
  }

  /**
   * Set whether to cache network responses
   */
  public save(active: boolean): ReactiveRecord {
    this.chain.saveNetwork = active;
    return this;
  }

  /**
   * @deprecated
   * use just `save` instead
   */
  public saveNetwork(active: boolean): ReactiveRecord {
    this.save(active);
    return this;
  }

  /**
   * Set a transform fn for the responses
   */
  public transform<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.chain.transformResponse = transformFn;
    return this;
  }

  /**
   * @deprecated use just `transform` instead
   */
  public transformResponse<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.transform(transformFn);
    return this;
  }

  /**
   * @deprecated use just `transform` instead
   */
  public transformNetwork<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    this.transform(transformFn);
    return this;
  }

  /**
   * Set cache time to live
   */
  public ttl(value: number): ReactiveRecord {
    this.chain.ttl = value;
    return this;
  }

  /**
   * Set whether to use cache for first requests
   */
  public cache(active: boolean): ReactiveRecord {
    this.chain.useCache = active;
    return this;
  }

  public state(arg?: boolean | string, value?: any): ReactiveRecord {
    const shouldSetChain = isBoolean(arg);
    const shouldSetState = !isEmpty(value) || value === {} || value === [];
    if (shouldSetChain) this.chain.useState = arg as boolean;
    if (shouldSetState) this.$state(arg as string, value);
    return shouldSetChain ? this : this.$state(arg as string);
  }

  /**
   * @deprecated
   * use `cache` instead
   */
  public useCache(active: boolean): ReactiveRecord {
    this.cache(active);
    return this;
  }

  /**
   * @deprecated
   * RR should not transform cache before saving it anymore
   */
  public transformCache<T>(
    transformFn: (response: Response) => any
  ): ReactiveRecord {
    return this;
  }

  /**
   * Set cache key
   */
  public key(name: string): ReactiveRecord {
    this.chain.key = name;
    return this;
  }

  /**
   * Set request query
   */
  public query(
    by: { [key: string]: {} } | { [key: string]: {} }[]
  ): ReactiveRecord {
    this.chain.query = by;
    return this;
  }

  /**
   * Set request where
   */
  public where(
    field: string,
    operator: string,
    value: string | number | boolean | []
  ): ReactiveRecord {
    if (!isArray(this.chain.query)) {
      this.chain.query = [];
    }
    this.chain.query.push({
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
    if (isEmpty(this.chain.sort)) {
      this.chain.sort = {};
    }
    // tslint:disable-next-line
    for (const k in by) {
      this.chain.sort[k] = by[k];
    }
    return this;
  }

  /**
   * Set request size
   */
  public size(value: number): ReactiveRecord {
    this.chain.size = value;
    return this;
  }

  /**
   * Set reference (for firebase)
   */
  public ref(path: string): ReactiveRecord {
    this.chain.ref = path;
    return this;
  }

  public data(transform: boolean): ReactiveRecord {
    this.chain.transformData = transform;
    return this;
  }

  public doc(value: string | number): ReactiveRecord {
    this.chain.doc = value;
    return this;
  }

  public reset(): ReactiveRecord {
    this._reset();
    return this;
  }

  /**
   * experimental
   */
  public reboot() {
    this._initialized = false;
    this._driver_initialized = {};
    this.reset();
    this.init({ driver: RR_DRIVER });
  }

  public diff(fn): ReactiveRecord {
    this.chain.diff = fn;
    return this;
  }

  protected $state(key: string, value?: any) {
    const shouldSetState = !isEmpty(value) || value === {} || value === [];
    if (shouldSetState && Config.store.change) Config.store.change(key, value);
    return Config.store.search ? Config.store.search(key) : {};
  }
}

export class PlatformServer extends ReactiveRecord {}
