// tslint:disable
import { AxiosRequestConfig } from 'axios';
import { isArray, isEmpty, isBoolean, isString, omit, startCase } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Response } from '../interfaces/response';
import { Reative } from '../symbols/reative';
import { ReativeAPI } from '../interfaces/api';
import { ReativeChainPayload, ReativeChain } from '../interfaces/chain';
import { ReativeDriverOption } from '../interfaces/driver';
import { ReativeOptions } from '../interfaces/options';
import { ReativeVerb } from '../interfaces/verb';
import { Log } from '../interfaces/log';
import { Logger } from '../utils/logger';
import { isServer } from '../utils/platform';
import { HttpDriver } from '../drivers/http';
import { SHA256 } from '../utils/sha';
import { R_VERSION } from '../version';
import { map } from 'rxjs/operators';
import { shouldTransformResponse } from '../utils/response';
import { SetOptions } from '../interfaces/set';
/**
 * @export
 * @class ReativeCore
 * @implements {ReativeAPI}
 */
export class ReativeCore implements ReativeAPI {
  chain: ReativeChainPayload = {};
  options: ReativeOptions;

  // log instance
  protected logger: Logger;

  // so external tools can listen for logs
  public $log: Subject<Log> = new Subject();

  constructor(options: ReativeOptions) {
    this.init(options);
  }

  public init(runtime: ReativeOptions = {}) {
    // settings which requires runtime evaluation
    const options: ReativeOptions = {
      ...Reative.options,
      ...runtime,
      httpConfig: {
        ...Reative.options.httpConfig,
        ...runtime.httpConfig
      }
    };

    // init logger
    this.logger = new Logger({
      subject: this.$log,
      silent: options.silent
    });

    // set drivers
    this.initDrivers(options);

    // log
    const name = options.collection || options.endpoint;
    this.log().success()(
      `Reative ${R_VERSION} Initiated Collection for ${startCase(name)}`
    );

    // initialize
    this.options = options;
    this.reset();
  }

  private initDrivers(options: ReativeOptions) {
    options.logger = this.logger;

    // install default driver
    Reative.driver.http = new HttpDriver();

    // instantiate everyone
    for (const driver of Reative.drivers) {
      Reative.driver[driver].configure(options);
    }
  }

  private checkVerbAvailability(
    _driver: ReativeDriverOption,
    _verb: ReativeVerb
  ): any {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = Reative.driver[_driver].verbs[_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
  }

  private checkChainAvailability(
    _driver: ReativeDriverOption,
    _chain: ReativeChain
  ): void {
    const msg = `[${_chain}] chaining method unavailable for driver ${_driver} on ${
      isServer() ? 'server' : 'browser'
    }`;
    const exists = Reative.driver[_driver].chaining[_chain];
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
    this.initDrivers(this.options);

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

    if (!Reative.driver[_driver])
      throw new Error(`Whoops! Reative didn't find ${_driver} driver`);

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
    // execute the request
    return Reative.driver[_driver][_verb]<T>(arg1, arg2, arg3, arg4).pipe(
      map((data: Response) => {
        if (isServer()) {
          if (!isBoolean(chain.transformData)) chain.transformData = true;
          const transformResponse: any = shouldTransformResponse(chain, data);
          return transformResponse(data);
        }
        return data;
      })
    );
  }

  /**
   * Reset the chaining configuration on the fly
   *
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public reset(): ReativeCore {
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
   * @memberof ReativeCore
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
   * @memberof ReativeCore
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
   * @memberof ReativeCore
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
   * @memberof ReativeCore
   */
  public delete<T>(path: string = '', body?: any): Observable<T> {
    return this.call<T>('delete', path, body);
  }

  /**
   * Find documents
   *
   * @template T
   * @returns {Observable<T>}
   * @memberof ReativeCore
   */
  public find<T>(): Observable<T> {
    return this.call<T>('find');
  }

  /**
   * Same as find but only one result is returned
   *
   * @template T
   * @returns {Observable<T>}
   * @memberof ReativeCore
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
   * @memberof ReativeCore
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
   * @memberof ReativeCore
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
   * @memberof ReativeCore
   */
  public on<T>(): Observable<T> {
    return this.call<T>('on');
  }

  /**
   *  Count documents
   *
   * @returns {Observable<number>}
   * @memberof ReativeCore
   */
  public count(): Observable<number> {
    return this.call<number>('count');
  }

  /**
   *  Run cloud functions
   *
   * @returns {Observable<number>}
   * @memberof ReativeCore
   */
  public run<T>(name: string, payload: any): Observable<T> {
    return this.call<T>('run', name, payload);
  }

  /**
   * Modify the driver to be used on the fly
   *
   * @param {ReativeDriverOption} name
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public driver(name: ReativeDriverOption): ReativeCore {
    this.chain.driver = name;
    this.checkChainAvailability(this.chain.driver, 'driver');
    return this;
  }

  /**
   * Modify http request config on the fly
   *
   * @param {Function} fn
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public http(fn: (config: AxiosRequestConfig) => void): ReativeCore {
    this.checkChainAvailability(this.chain.driver, 'http');
    fn(this.options.httpConfig);
    return this;
  }

  /**
   * Choose whether or not to make a network request
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public network(active: boolean): ReativeCore {
    this.chain.useNetwork = active;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Choose whether or not to save returned data in cache
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public save(active: boolean): ReativeCore {
    this.chain.saveNetwork = active;
    this.checkChainAvailability(this.chain.driver, 'save');
    return this;
  }

  /**
   * Shortcut to modify returned results without a pipe
   *
   * @template T
   * @param {Function} transformFn
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public transform<T>(transformFn: (response: Response) => any): ReativeCore {
    this.chain.transformResponse = transformFn;
    this.checkChainAvailability(this.chain.driver, 'transform');
    return this;
  }

  /**
   * Define a time to live for cache
   *
   * @param {number} value
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public ttl(value: number): ReativeCore {
    this.chain.ttl = value;
    this.checkChainAvailability(this.chain.driver, 'ttl');
    return this;
  }

  /**
   * Choose whether to use cached results
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public cache(active: boolean): ReativeCore {
    this.chain.useCache = active;
    this.checkChainAvailability(this.chain.driver, 'cache');
    return this;
  }

  /**
   * Choose whether to use state results
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public state(active: boolean): ReativeCore {
    this.chain.useState = active;
    this.checkChainAvailability(this.chain.driver, 'state');
    return this;
  }

  /**
   * Define a custom key to be used as a identifier for the result set
   *
   * @param {string} name
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public key(name: string): ReativeCore {
    this.chain.key = name;
    this.checkChainAvailability(this.chain.driver, 'key');
    return this;
  }

  /**
   * Define a custom query
   *
   * @param {object} by
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public query(
    by: { [key: string]: {} } | { [key: string]: {} }[]
  ): ReativeCore {
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
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public where(field: string, operator: string, value: any): ReativeCore {
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
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public sort(by: { [key: string]: string }): ReativeCore {
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
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public size(value: number): ReativeCore {
    this.chain.size = value;
    this.checkChainAvailability(this.chain.driver, 'size');
    return this;
  }

  /**
   * Set an at pointer for the request
   *
   * @param {*} value
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public at(value): ReativeCore {
    this.chain.at = value;
    this.checkChainAvailability(this.chain.driver, 'at');
    return this;
  }

  /**
   * Set an after pointer for the request
   *
   * @param {*} value
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public after(value): ReativeCore {
    this.chain.after = value;
    this.checkChainAvailability(this.chain.driver, 'after');
    return this;
  }

  /**
   * Define a document path for a request
   *
   * @param {string} path
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public ref(path: string): ReativeCore {
    this.chain.ref = path;
    this.checkChainAvailability(this.chain.driver, 'ref');
    return this;
  }

  /**
   * Define a document id for the request
   *
   * @param {*} value
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public doc(value: any): ReativeCore {
    this.chain.doc = value;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Use pure results without any internal transformation
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public raw(active: boolean): ReativeCore {
    this.chain.transformData = !active;
    this.checkChainAvailability(this.chain.driver, 'raw');
    return this;
  }

  /**
   * Populate query fields
   *
   * @param {string[]} fields
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public include(fields: string[]): ReativeCore {
    this.chain.fields = fields;
    this.checkChainAvailability(this.chain.driver, 'include');
    return this;
  }

  /**
   * Modify internal diff function
   *
   * @param {*} fn
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public diff(fn: any): ReativeCore {
    this.chain.diff = fn;
    this.checkChainAvailability(this.chain.driver, 'diff');
    return this;
  }

  /**
   * Set useMasterKey on the request
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public master(active: boolean): ReativeCore {
    this.chain.useMasterKey = active;
    this.checkChainAvailability(this.chain.driver, 'master');
    return this;
  }

  /**
   * Set a session token for the request
   *
   * @param {string} session
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public token(session: string): ReativeCore {
    this.chain.useSessionToken = session;
    this.checkChainAvailability(this.chain.driver, 'token');
    return this;
  }

  /**
   * Result as real objects
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public object(active: boolean): ReativeCore {
    this.chain.useObject = active;
    this.checkChainAvailability(this.chain.driver, 'object');
    return this;
  }

  /**
   * Activate worker
   *
   * @param {boolean} active
   * @returns {ReativeCore}
   * @memberof ReativeCore
   */
  public worker(active: boolean): ReativeCore {
    this.chain.useWorker = active;
    this.checkChainAvailability(this.chain.driver, 'worker');
    return this;
  }
}

export class Records extends ReativeCore {}
export class PlatformServer extends ReativeCore {}
