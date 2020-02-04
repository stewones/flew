// tslint:disable
import { AxiosRequestConfig } from 'axios';
import { isArray, isEmpty, isString, omit, startCase } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { FirebaseDriver } from '../drivers/firebase';
import { FirestoreDriver } from '../drivers/firestore';
import { HttpDriver } from '../drivers/http';
import { ParseDriver } from '../drivers/parse';
import { ReativeAPI, SetOptions } from '../interfaces/api';
import { ReativeChainPayload, ReativeChain } from '../interfaces/chain';
import { ReativeDriver, ReativeDriverOption } from '../interfaces/driver';
import { Log } from '../interfaces/log';
import { ReativeOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { ReativeVerb } from '../interfaces/verb';
import { Reative } from '../symbols/reative';
import { Logger } from '../utils/logger';
import { SHA256 } from '../utils/sha';
import { RR_VERSION } from '../version';
import { isServer } from '../utils/platform';

type ReativeDriverVerbTree = {
  [key in ReativeDriverOption]: { [key in ReativeVerb]: string | boolean | any }
};

type ReativeDriverChainTree = {
  [key in ReativeDriverOption]: { [key in ReativeChain]: string | boolean }
};

/**
 * Reative Records
 *
 * @export
 * @class Records
 * @implements {ReativeAPI}
 */
export class Records implements ReativeAPI {
  chain: ReativeChainPayload = {};
  options: ReativeOptions;

  // log instance
  protected logger: Logger;

  // so external tools can listen for logs
  public $log: Subject<Log> = new Subject();

  //
  // available drivers
  protected drivers: {
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

  //
  // verbs tree
  protected verbs: ReativeDriverVerbTree = {
    firestore: {
      find: true,
      findOne: true,
      on: true,
      get: 'http.get',
      post: 'http.post',
      update: true,
      patch: 'http.patch',
      delete: 'http.delete',
      set: true,
      count: false,
      run: false
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
      set: 'http.post',
      count: false,
      run: false
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
      set: 'http.post',
      count: false,
      run: false
    },
    parse: {
      find: true,
      findOne: true,
      on: true,
      get: 'parse.find',
      post: 'parse.find',
      update: 'parse.update',
      patch: 'parse.set',
      delete: true, // can use doc_id or objectId
      set: true,
      count: true,
      run: true
    }
  };

  //
  // chaining tree
  protected chaining: ReativeDriverChainTree = {
    firestore: {
      driver: true,
      network: true,
      key: true,
      query: false,
      where: true,
      sort: true,
      size: true,
      at: true,
      after: true,
      ref: false,
      raw: true,
      transform: true,
      diff: true,
      http: false,
      include: false,
      doc: true,
      master: false,
      token: false,
      object: false,
      save: 'browser',
      ttl: 'browser',
      state: 'browser',
      cache: 'browser',
      worker: false
    },
    firebase: {
      driver: true,
      network: true,
      key: true,
      query: false,
      where: true,
      sort: false,
      size: false,
      at: false,
      after: false,
      ref: true,
      raw: true,
      transform: true,
      diff: true,
      http: false,
      include: false,
      doc: false,
      master: false,
      token: false,
      object: false,
      save: 'browser',
      ttl: 'browser',
      state: 'browser',
      cache: 'browser',
      worker: false
    },
    http: {
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
      worker: true
    },
    parse: {
      driver: true,
      network: true,
      key: true,
      query: true,
      where: true,
      sort: true,
      size: true,
      at: false,
      after: true,
      ref: false,
      raw: true,
      transform: true,
      diff: true,
      http: false,
      include: true,
      doc: true,
      master: true,
      token: true,
      object: true,
      save: 'browser',
      ttl: 'browser',
      state: 'browser',
      cache: 'browser',
      worker: true
    }
  };

  constructor(options: ReativeOptions) {
    this.init(options);
  }

  public init(runtime: ReativeOptions = {}) {
    //
    // settings which requires runtime evaluation
    const options: ReativeOptions = {
      ...Reative.options,
      ...runtime,
      httpConfig: {
        ...Reative.options.httpConfig,
        ...runtime.httpConfig
      }
    };

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
    this.options = options;
    this.reset();
  }

  private initDrivers(options: ReativeOptions) {
    options.logger = this.logger;
    this.drivers = {
      firestore: new FirestoreDriver(options),
      firebase: new FirebaseDriver(options),
      http: new HttpDriver(options),
      parse: new ParseDriver(options)
    };
  }

  private checkVerbAvailability(
    _driver: ReativeDriverOption,
    _verb: ReativeVerb
  ): ReativeVerb {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = this.verbs[_driver][_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
  }

  private checkChainAvailability(
    _driver: ReativeDriverOption,
    _method: ReativeChain
  ): void {
    const msg = `[${_method}] chaining method unavailable for driver ${_driver} on ${
      isServer() ? 'server' : 'browser'
    }`;

    const exists = this.chaining[_driver][_method];
    if (exists === false || (exists === 'browser' && isServer())) {
      return this.log().danger()(msg);
    }
  }

  protected log(): Logger {
    return this.logger;
  }

  protected createKey(verb, path, body): string {
    const chain = { ...this.chain };
    const options = { ...this.options };
    const payload = JSON.stringify({
      ...verb,
      ...body,
      ...{ path: path },
      ...{ driver: chain.driver },
      ...omit(chain, ['ttl', 'key', 'transformResponse', 'diff'])
    });
    const key = `${options.collection || 'rr'}:/${options.endpoint ||
      ''}${path || ''}/${SHA256(payload)}`;
    return chain.key || key.split('///').join('//');
  }

  protected call<T>(
    method: ReativeVerb,
    path: string = '',
    payload: any = {},
    chain: ReativeChainPayload = { ...this.chain },
    key: string = ''
  ): Observable<T> {
    //
    // @deprecated
    // reconfigure http client
    // to get access on stuff
    // defined after initialization
    // this.refresh();

    let _verb = method;
    let _driver = chain.driver;
    let arg1, arg2, arg3, arg4;

    //
    // get verb
    const verb = this.checkVerbAvailability(_driver, _verb);

    //
    // map to the correct option
    if (isString(verb)) {
      _driver = verb.split('.')[0] as ReativeDriverOption;
      _verb = verb.split('.')[1] as ReativeVerb;
    }

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
      case 'count':
        arg1 = chain;
        arg2 = key;
        break;
      case 'set':
      case 'update':
        arg1 = chain;
        arg2 = payload.data;
        arg3 = payload.options;
        break;
      case 'delete':
        arg1 = path;
        arg2 = key;
        arg3 = payload;
        arg4 = chain;
        break;
      case 'on':
        arg1 = chain;
        arg2 = key;
        break;
      case 'run':
        arg1 = path;
        arg2 = payload;
        arg3 = key;
        break;
      default:
        arg1 = path;
        arg2 = key;
        arg3 = payload;
        arg4 = chain;
    }

    //
    // execute request
    return this.drivers[_driver][_verb]<T>(arg1, arg2, arg3, arg4);
  }

  /**
   * Reset the chaining configuration on the fly
   *
   * @returns {Records}
   * @memberof Records
   */
  public reset(): Records {
    this.chain = {
      driver: this.options.driver,
      useCache: this.options.useCache,
      useState: this.options.useState,
      useNetwork: this.options.useNetwork,
      useWorker: this.options.useWorker,
      saveNetwork: this.options.saveNetwork
    };
    return this;
  }

  /**
   * Get a document
   *
   * @template T
   * @param {string} [path='']
   * @returns {Observable<T>}
   * @memberof Records
   */
  public get<T>(path: string = ''): Observable<T> {
    return this.call<T>('get', path);
  }

  /**
   * Post document
   *
   * @template T
   * @param {string} [path='']
   * @param {*} [body={}]
   * @returns {Observable<T>}
   * @memberof Records
   */
  public post<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call<T>('post', path, body);
  }

  /**
   * Patch a document
   *
   * @template T
   * @param {string} [path='']
   * @param {*} [body={}]
   * @returns {Observable<T>}
   * @memberof Records
   */
  public patch<T>(path: string = '', body: any = {}): Observable<T> {
    return this.call<T>('patch', path, body);
  }

  /**
   * Delete a document
   *
   * @template T
   * @param {string} [path='']
   * @param {*} [body]
   * @returns {Observable<T>}
   * @memberof Records
   */
  public delete<T>(path: string = '', body?: any): Observable<T> {
    return this.call<T>('delete', path, body);
  }

  /**
   * Find documents
   *
   * @template T
   * @returns {Observable<T>}
   * @memberof Records
   */
  public find<T>(): Observable<T> {
    return this.call<T>('find');
  }

  /**
   * Same as find but only one result is returned
   *
   * @template T
   * @returns {Observable<T>}
   * @memberof Records
   */
  public findOne<T>(): Observable<T> {
    return this.call<T>('findOne');
  }

  /**
   * Create a document
   *
   * @template T
   * @param {*} data
   * @param {SetOptions} [options]
   * @returns {Observable<T>}
   * @memberof Records
   */
  public set<T>(data: any, options?: SetOptions): Observable<T> {
    return this.call('set', null, {
      data: data,
      options: options
    });
  }

  /**
   * Update document
   *
   * @template T
   * @param {*} data
   * @returns {Observable<T>}
   * @memberof Records
   */
  public update<T>(data: any): Observable<T> {
    return this.call('update', null, {
      data: data
    });
  }

  /**
   * Get documents in realtime
   *
   * @template T
   * @returns {Observable<T>}
   * @memberof Records
   */
  public on<T>(): Observable<T> {
    return this.call<T>('on');
  }

  /**
   *  Count documents
   *
   * @returns {Observable<number>}
   * @memberof Records
   */
  public count(): Observable<number> {
    return this.call<number>('count');
  }

  /**
   *  Run cloud functions
   *
   * @returns {Observable<number>}
   * @memberof Records
   */
  public run<T>(name: string, payload: any): Observable<T> {
    return this.call<T>('run', name, payload);
  }

  /**
   * Modify the driver to be used on the fly
   *
   * @param {ReativeDriverOption} name
   * @returns {Records}
   * @memberof Records
   */
  public driver(name: ReativeDriverOption): Records {
    this.chain.driver = name;
    this.checkChainAvailability(this.chain.driver, 'driver');
    return this;
  }

  /**
   * Modify http request config on the fly
   *
   * @param {Function} fn
   * @returns {Records}
   * @memberof Records
   */
  public http(fn: (config: AxiosRequestConfig) => void): Records {
    this.checkChainAvailability(this.chain.driver, 'http');
    fn(this.options.httpConfig);
    return this;
  }

  /**
   * Choose whether or not to make a network request
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public network(active: boolean): Records {
    this.chain.useNetwork = active;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Choose whether or not to save returned data in cache
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public save(active: boolean): Records {
    this.chain.saveNetwork = active;
    this.checkChainAvailability(this.chain.driver, 'save');
    return this;
  }

  /**
   * Shortcut to modify returned results without a pipe
   *
   * @template T
   * @param {Function} transformFn
   * @returns {Records}
   * @memberof Records
   */
  public transform<T>(transformFn: (response: Response) => any): Records {
    this.chain.transformResponse = transformFn;
    this.checkChainAvailability(this.chain.driver, 'transform');
    return this;
  }

  /**
   * Define a time to live for cache
   *
   * @param {number} value
   * @returns {Records}
   * @memberof Records
   */
  public ttl(value: number): Records {
    this.chain.ttl = value;
    this.checkChainAvailability(this.chain.driver, 'ttl');
    return this;
  }

  /**
   * Choose whether to use cached results
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public cache(active: boolean): Records {
    this.chain.useCache = active;
    this.checkChainAvailability(this.chain.driver, 'cache');
    return this;
  }

  /**
   * Choose whether to use state results
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public state(active: boolean): Records {
    this.chain.useState = active;
    this.checkChainAvailability(this.chain.driver, 'state');
    return this;
  }

  /**
   * Define a custom key to be used as a identifier for the result set
   *
   * @param {string} name
   * @returns {Records}
   * @memberof Records
   */
  public key(name: string): Records {
    this.chain.key = name;
    this.checkChainAvailability(this.chain.driver, 'key');
    return this;
  }

  /**
   * Define a custom query
   *
   * @param {object} by
   * @returns {Records}
   * @memberof Records
   */
  public query(by: { [key: string]: {} } | { [key: string]: {} }[]): Records {
    this.chain.query = by;
    this.checkChainAvailability(this.chain.driver, 'query');
    return this;
  }

  /**
   * Constraint results
   *
   * @param {string} field
   * @param {string} operator
   * @param {*} value
   * @returns {Records}
   * @memberof Records
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
    this.checkChainAvailability(this.chain.driver, 'where');
    return this;
  }

  /**
   * Sort data
   *
   * @param {object} by
   * @returns {Records}
   * @memberof Records
   */
  public sort(by: { [key: string]: string }): Records {
    if (isEmpty(this.chain.sort)) {
      this.chain.sort = {};
    }
    // tslint:disable-next-line
    for (const k in by) {
      this.chain.sort[k] = by[k];
    }
    this.checkChainAvailability(this.chain.driver, 'sort');
    return this;
  }

  /**
   * Define the size of results
   *
   * @param {number} value
   * @returns {Records}
   * @memberof Records
   */
  public size(value: number): Records {
    this.chain.size = value;
    this.checkChainAvailability(this.chain.driver, 'size');
    return this;
  }

  /**
   * Set an at pointer for the request
   *
   * @param {*} value
   * @returns {Records}
   * @memberof Records
   */
  public at(value): Records {
    this.chain.at = value;
    this.checkChainAvailability(this.chain.driver, 'at');
    return this;
  }

  /**
   * Set an after pointer for the request
   *
   * @param {*} value
   * @returns {Records}
   * @memberof Records
   */
  public after(value): Records {
    this.chain.after = value;
    this.checkChainAvailability(this.chain.driver, 'after');
    return this;
  }

  /**
   * Define a document path for a request
   *
   * @param {string} path
   * @returns {Records}
   * @memberof Records
   */
  public ref(path: string): Records {
    this.chain.ref = path;
    this.checkChainAvailability(this.chain.driver, 'ref');
    return this;
  }

  /**
   * Define a document id for the request
   *
   * @param {*} value
   * @returns {Records}
   * @memberof Records
   */
  public doc(value: any): Records {
    this.chain.doc = value;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Use pure results without any internal transformation
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public raw(active: boolean): Records {
    this.chain.transformData = !active;
    this.checkChainAvailability(this.chain.driver, 'raw');
    return this;
  }

  /**
   * Populate query fields
   *
   * @param {string[]} fields
   * @returns {Records}
   * @memberof Records
   */
  public include(fields: string[]): Records {
    this.chain.fields = fields;
    this.checkChainAvailability(this.chain.driver, 'include');
    return this;
  }

  /**
   * Modify internal diff function
   *
   * @param {*} fn
   * @returns {Records}
   * @memberof Records
   */
  public diff(fn: any): Records {
    this.chain.diff = fn;
    this.checkChainAvailability(this.chain.driver, 'diff');
    return this;
  }

  /**
   * Set useMasterKey on the request
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public master(active: boolean): Records {
    this.chain.useMasterKey = active;
    this.checkChainAvailability(this.chain.driver, 'master');
    return this;
  }

  /**
   * Set a session token for the request
   *
   * @param {string} session
   * @returns {Records}
   * @memberof Records
   */
  public token(session: string): Records {
    this.chain.useSessionToken = session;
    this.checkChainAvailability(this.chain.driver, 'token');
    return this;
  }

  /**
   * Result as real objects
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public object(active: boolean): Records {
    this.chain.useObject = active;
    this.checkChainAvailability(this.chain.driver, 'object');
    return this;
  }

  /**
   * Activate worker
   *
   * @param {boolean} active
   * @returns {Records}
   * @memberof Records
   */
  public worker(active: boolean): Records {
    this.chain.useWorker = active;
    this.checkChainAvailability(this.chain.driver, 'worker');
    return this;
  }
}

export class PlatformServer extends Records {}
