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
import { ReativeApi } from '../interfaces/api';
import { ReativeVerb } from '../interfaces/verb';
import { ReativeDriverOption, ReativeDriver } from '../interfaces/driver';
import { StorageAdapter } from '../interfaces/storage';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { Reative } from '../symbols/reative';
import { FirestoreDriver } from '../drivers/firestore';
import { FirebaseDriver } from '../drivers/firebase';
import { ParseDriver } from '../drivers/parse';
import { HttpDriver } from '../drivers/http';
import { RR_VERSION } from '../version';
import { RR_DRIVER } from '../driver';
import { SHA256 } from '../utils/sha';
import { Chain } from '../interfaces/chain';
export class Records implements ReativeApi {
  protected collection: string;
  protected endpoint: string;
  protected _storage: StorageAdapter;

  private httpConfig: AxiosRequestConfig = {};
  private beforeHttp = (config: AxiosRequestConfig) => {};

  private chain: Chain = {};

  private _driver: ReativeDriverOption = RR_DRIVER;
  private _drivers: {
    firestore: ReativeDriver;
    firebase: ReativeDriver;
    http: ReativeDriver;
    parse: ReativeDriver;
  } = {
    firestore: {} as ReativeDriver,
    firebase: {} as ReativeDriver,
    http: {} as ReativeDriver,
    parse: {} as ReativeDriver
  };

  public $log: Subject<Log> = new Subject();

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
    },
    parse: {
      find: true,
      findOne: true,
      on: true,
      get: 'parse.find',
      post: 'parse.find',
      update: 'parse.set',
      patch: 'parse.set',
      delete: false,
      set: true
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
    // settings initialized once
    if (this._initialized) return;

    //
    // configure logger
    if (!isBoolean(options.useLog)) options.useLog = true;
    if (!isBoolean(options.useLogTrace)) options.useLogTrace = false;
    if (!isBoolean(options.silent)) options.useLog = true;

    if (options.silent === true) {
      options.useLog = false;
      options.useLogTrace = false;
    }

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

    Reative.ready$.next();
    Reative.ready$.complete();

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
    return newOptions;
  }

  /**
   * @deprecated
   * import the pure function `firebase`
   * from firebase package
   */
  public firebase() {
    return Reative.connector.firebase;
  }

  /**
   * @deprecated
   * import the pure function `firestore`
   * from firebase package
   */
  public firestore() {
    return Reative.connector.firestore;
  }

  /**
   * Clear browser cache
   * @deprecated
   * import the pure function `resetCache`
   * from cache package
   */
  public clearCache(): void {}

  /**
   * Feed store with cached responses
   */
  public feed(): void {}

  protected log(): Logger {
    return this.logger;
  }

  protected getDriver(): ReativeDriverOption {
    return this._driver;
  }

  private _reset(): void {
    // this.driver(RR_DRIVER);
    this.chain = {};
  }

  private cloneOptions() {
    const consumer: Options = this._initial_options;
    const general: Options = Reative.options;
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
      }),
      parse: new ParseDriver({
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

  private getVerbOrException(_driver: string, _verb: string): ReativeVerb {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = this.verbs[_driver][_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
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
    return { ...this._initial_options.chain, ...this.chain };
  }

  protected call<T>(
    method: ReativeVerb,
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
      _driver = verb.split('.')[0] as ReativeDriverOption;
      _verb = verb.split('.')[1] as ReativeVerb;
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
  public driver(name?: ReativeDriverOption): Records {
    if (name) {
      this._driver = name;
      return this;
    }
    return this.getDriver() as any;
  }

  public http(fn: (config: AxiosRequestConfig) => void): Records {
    this.beforeHttp = fn;
    return this;
  }

  /**
   * Set whether to use network for first requests
   */
  public network(active: boolean): Records {
    this.chain.useNetwork = active;
    return this;
  }

  /**
   * Set whether to cache network responses
   */
  public save(active: boolean): Records {
    this.chain.saveNetwork = active;
    return this;
  }

  /**
   * Set a transform fn for the responses
   */
  public transform<T>(transformFn: (response: Response) => any): Records {
    this.chain.transformResponse = transformFn;
    return this;
  }

  /**
   * Set cache time to live
   */
  public ttl(value: number): Records {
    this.chain.ttl = value;
    return this;
  }

  /**
   * Set whether to use cache for first requests
   */
  public cache(active: boolean): Records {
    this.chain.useCache = active;
    return this;
  }

  public state(active: boolean): Records {
    this.chain.useState = active;
    return this;
  }

  /**
   * Set cache key
   */
  public key(name: string): Records {
    this.chain.key = name;
    return this;
  }

  /**
   * Set request query
   */
  public query(by: { [key: string]: {} } | { [key: string]: {} }[]): Records {
    this.chain.query = by;
    return this;
  }

  /**
   * Set request where
   */
  public where(field: string, operator: string, value: any): Records {
    if (!isArray(this.chain.where)) {
      this.chain.where = [];
    }
    this.chain.where.push({
      field: field,
      operator: operator,
      value: value
    });
    return this;
  }

  /**
   * Set request sort
   */
  public sort(by: { [key: string]: string }): Records {
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
  public size(value: number): Records {
    this.chain.size = value;
    return this;
  }

  /**
   * Set request startAt
   */
  public at(value): Records {
    this.chain.at = value;
    return this;
  }

  /**
   * Set request startAfter
   */
  public after(value): Records {
    this.chain.after = value;
    return this;
  }

  /**
   * Set reference (for firebase)
   */
  public ref(path: string): Records {
    this.chain.ref = path;
    return this;
  }

  public doc(value: string | number): Records {
    this.chain.doc = value;
    return this;
  }

  public raw(active: boolean): Records {
    this.chain.transformData = !active;
    return this;
  }

  /**
   * @deprecated
   * use just `save` instead
   */
  public saveNetwork(active: boolean): Records {
    this.save(active);
    return this;
  }

  /**
   * @deprecated use just `transform` instead
   */
  public transformResponse<T>(
    transformFn: (response: Response) => any
  ): Records {
    this.transform(transformFn);
    return this;
  }

  /**
   * @deprecated
   * use `cache` instead
   */
  public useCache(active: boolean): Records {
    this.cache(active);
    return this;
  }

  /**
   * @deprecated use just `transform` instead
   */
  public transformNetwork<T>(
    transformFn: (response: Response) => any
  ): Records {
    this.transform(transformFn);
    return this;
  }

  /**
   * @deprecated
   * use just `network` instead
   */
  public useNetwork(active: boolean): Records {
    this.network(active);
    return this;
  }

  /**
   * @deprecated
   * import the function `storage`
   * from @reative/cache
   */
  public storage(): StorageAdapter {
    return Reative.storage || ({} as StorageAdapter);
  }

  /**
   * @deprecated now rr should return data formatted properly by default
   * if you're looking for disable this behavior, just add `.raw(true)` in your chaining
   */
  public data(transform: boolean): Records {
    this.chain.transformData = transform;
    return this;
  }

  /**
   * @deprecated
   * RR no longer transforms cache before saving
   */
  public transformCache<T>(transformFn: (response: Response) => any): Records {
    return this;
  }

  /**
   * experimental
   */

  public reset(): Records {
    this._reset();
    return this;
  }

  public reboot() {
    this._initialized = false;
    this.reset();
    this.init({ driver: RR_DRIVER });
  }

  public diff(fn): Records {
    this.chain.diff = fn;
    return this;
  }

  public model(): any {
    return Reative.parse.model(this.collection);
  }
}

export class PlatformServer extends Records {}
