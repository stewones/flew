// tslint:disable
import { AxiosRequestConfig } from 'axios';
import { isEmpty, isArray, isString, startCase, omit, cloneDeep } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Response } from '../interfaces/response';
import { ReativeOptions } from '../interfaces/options';
import { ReativeApi, SetOptions } from '../interfaces/api';
import { ReativeVerb } from '../interfaces/verb';
import { ReativeDriverOption, ReativeDriver } from '../interfaces/driver';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { Reative } from '../symbols/reative';
import { FirestoreDriver } from '../drivers/firestore';
import { FirebaseDriver } from '../drivers/firebase';
import { ParseDriver } from '../drivers/parse';
import { HttpDriver } from '../drivers/http';
import { RR_VERSION } from '../version';

import { SHA256 } from '../utils/sha';
import { Chain } from '../interfaces/chain';
export class Records implements ReativeApi {
  chain: Chain = {};
  options: ReativeOptions;
  optionsDefault: ReativeOptions;

  private beforeHttp = (config: AxiosRequestConfig) => {};

  //
  // available drivers currently
  private drivers: {
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

  public $log: Subject<Log> = new Subject(); // so external tools can listen for logs
  protected logger: Logger; // log instance

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

  protected _initialized: boolean;

  constructor(options: ReativeOptions) {
    this.init(options);
  }

  public init(runtime: ReativeOptions = {}) {
    //
    // settings which requires runtime evaluation
    const options: ReativeOptions = {
      ...Reative.options,
      ...runtime
    };

    //
    // http defaults
    if (!options.httpConfig.timeout) options.httpConfig.timeout = 60 * 1000;
    if (!options.httpConfig.baseURL)
      options.httpConfig.baseURL = options.baseURL;
    if (!options.httpConfig.headers) options.httpConfig.headers = {};

    //
    // configure http client (needs to be done on every request)
    // this.httpDriverRefresh(initializedOptions);

    //
    // init logger
    this.logger = new Logger({
      subject: this.$log,
      silent: options.silent
    });

    //
    // set drivers
    this.initDrivers(options);

    //
    // log
    const name = options.collection || options.endpoint;

    this.log().success()(
      `Reative ${RR_VERSION} Initiated Collection for ${startCase(name)}`
    );

    //
    // initialize
    this.options = cloneDeep(options);
    this.optionsDefault = cloneDeep(options);
    this.initChain();

    //
    // mark as initialized
    this._initialized = true;
  }

  private initDrivers(options: ReativeOptions) {
    this.drivers = {
      firestore: new FirestoreDriver({
        ...options,
        ...{ logger: this.logger }
      }),
      firebase: new FirebaseDriver({
        ...options,
        ...{ logger: this.logger }
      }),
      http: new HttpDriver({
        ...options,
        ...{ logger: this.logger }
      }),
      parse: new ParseDriver({
        ...options,
        ...{ logger: this.logger }
      })
    };
  }

  private initChain() {
    this.chain = {
      useCache: this.optionsDefault.useCache,
      useState: this.optionsDefault.useState,
      useNetwork: this.optionsDefault.useNetwork,
      saveNetwork: this.optionsDefault.saveNetwork
    };
  }

  private httpDriverRefresh() {
    const options = { ...this.options };
    this.beforeHttp(options.httpConfig);
    this.drivers.http = new HttpDriver({
      ...options,
      ...{ logger: this.logger }
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

  public set<T>(data: any, options?: SetOptions): Observable<T> {
    return this.call('set', null, {
      data: data,
      options: options
    });
  }

  public update<T>(data: any): Observable<T> {
    return this.call('update', null, {
      data: data
    });
  }

  public on<T>(): Observable<T> {
    return this.call<T>('on');
  }

  protected createKey(verb, path, body): string {
    const chain = { ...this.chain };
    const payload = JSON.stringify({
      ...verb,
      ...body,
      ...{ path: path },
      ...{ driver: this.options.driver },
      ...omit(chain, ['ttl', 'key', 'transformResponse', 'diff'])
    });
    const key = `${this.options.collection || 'rr'}:/${this.options.endpoint ||
      ''}${path || ''}/${SHA256(payload)}`;
    return chain.key || key.split('///').join('//');
  }

  protected call<T>(
    method: ReativeVerb,
    path: string = '',
    payload: any = {},
    chain = { ...this.chain },
    key: string = ''
  ): Observable<T> {
    //
    // configure http client
    this.httpDriverRefresh();

    let _verb = method;
    let _driver = this.options.driver;
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
    // define an unique key
    key = key ? key : this.createKey(_verb, path, payload);

    //
    // reset the chain
    this.reset();

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
        arg1 = chain;
        arg2 = payload.data;
        arg3 = payload.options;
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
    return this.drivers[_driver][_verb]<T>(arg1, arg2, arg3);
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

  public driver(name: ReativeDriverOption): Records {
    this.options.driver = name;
    return this;
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

  public include(fields: string[]): Records {
    this.chain.fields = fields;
    return this;
  }

  public reset(): Records {
    this.options = cloneDeep(this.optionsDefault);
    this.initChain();

    return this;
  }

  public diff(fn): Records {
    this.chain.diff = fn;
    return this;
  }

  protected log(): Logger {
    return this.logger;
  }
}

export class PlatformServer extends Records {}
