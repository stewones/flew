import { AxiosRequestConfig } from 'axios';
import { isArray, isEmpty, isString, omit } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Rebased } from '../symbols/rebased';
import { RebasedAPI } from '../interfaces/api';
import { RebasedChainPayload, RebasedChain } from '../interfaces/chain';
import { RebasedDriverOption } from '../interfaces/driver';
import { RebasedOptions } from '../interfaces/options';
import { RebasedVerb } from '../interfaces/verb';
import { Log } from '../interfaces/log';
import { Logger } from '../effects/logger';
import { isServer } from '../effects/isServer';
import { HttpDriver } from '../drivers/http';
import { SHA256 } from '../effects/sha';
import { R_VERSION } from '../version';
import { SetOptions } from '../interfaces/set';

/**
 * @export
 * @class RebasedCore
 * @implements {RebasedAPI}
 */
export class RebasedCore implements RebasedAPI {
  chain: RebasedChainPayload = {};
  options: RebasedOptions;

  // log instance
  protected logger: Logger;

  // so external tools can listen for logs
  public $log: Subject<Log> = new Subject();

  constructor(options: RebasedOptions) {
    this.init(options);
  }

  public init(runtime: RebasedOptions = {}) {
    // settings which requires runtime evaluation
    const options: RebasedOptions = {
      ...Rebased.options,
      ...runtime,
      httpConfig: {
        ...Rebased.options.httpConfig,
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
    const name = options.from || options.endpoint;
    this.log().success()(`${name} call [Rebased ${R_VERSION}]`);

    // initialize
    this.options = options;
    this.reset();
  }

  private initDrivers(options: RebasedOptions) {
    options.logger = this.logger;

    // install default driver
    Rebased.driver.http = new HttpDriver();

    // instantiate everyone
    for (const driver of Rebased.drivers) {
      Rebased.driver[driver].configure(options);
    }
  }

  private checkVerbAvailability(
    _driver: RebasedDriverOption,
    _verb: RebasedVerb
  ): any {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = Rebased.driver[_driver].verbs[_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
  }

  private checkChainAvailability(
    _driver: RebasedDriverOption,
    _chain: RebasedChain
  ): void {
    const msg = `[${_chain}] chaining method unavailable for driver ${_driver} on ${
      isServer() ? 'server' : 'browser'
    }`;
    const exists = Rebased.driver[_driver].chaining[_chain];
    if (exists === false || (exists === 'browser' && isServer())) {
      return this.log().danger()(msg);
    }
  }

  protected log(): Logger {
    return this.logger;
  }

  protected createKey(verb, path, body): string {
    if (this.chain.key) return this.chain.key;

    const chain = { ...this.chain };
    const options = { ...this.options };
    const payload = JSON.stringify({
      ...verb,
      ...body,
      ...{ path: path },
      ...{ driver: chain.driver },
      ...omit(chain, ['key', 'useNetwork', 'useCache', 'useState'])
    });

    const keyStart = options.from || 'rebased';
    const keyEndpoint = chain.driver === 'http' ? options.endpoint : '';
    const keyPath = chain.driver === 'http' ? path || options.pathname : '';
    const keyCrypt = SHA256(payload);

    const key = `${keyStart}:/${keyEndpoint}${keyPath}/${keyCrypt}`;

    return key.split('///').join('//');
  }

  protected call<T>(
    method: RebasedVerb,
    path: string = '',
    payload: any = {},
    chain: RebasedChainPayload = { ...this.chain },
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
      _driver = verb.split('.')[0] as RebasedDriverOption;
      _verb = verb.split('.')[1] as RebasedVerb;
    }

    if (!Rebased.driver[_driver])
      throw new Error(`Whoops! Rebased didn't find ${_driver} driver`);

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
    return Rebased.driver[_driver][_verb]<T>(arg1, arg2, arg3, arg4);
  }

  /**
   * Reset the chaining configuration on the fly
   *
   * @returns {RebasedCore}
   */
  public reset(): RebasedCore {
    this.chain = {
      driver: this.options.driver,
      useCache: this.options.useCache,
      useNetwork: this.options.useNetwork,
      useState: this.options.useState
    };
    return this;
  }

  /**
   * Get a document
   *
   * @template T
   * @param {string} [path='']
   * @returns {Observable<T>}
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
   */
  public delete<T>(path: string = '', body?: any): Observable<T> {
    return this.call<T>('delete', path, body);
  }

  /**
   * Find documents
   *
   * @template T
   * @returns {Observable<T>}
   */
  public find<T>(): Observable<T> {
    return this.call<T>('find');
  }

  /**
   * Same as find but only one result is returned
   *
   * @template T
   * @returns {Observable<T>}
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
   */
  public on<T>(): Observable<T> {
    return this.call<T>('on');
  }

  /**
   *  Count documents
   *
   * @returns {Observable<number>}
   */
  public count(): Observable<number> {
    return this.call<number>('count');
  }

  /**
   *  Run cloud functions
   *
   * @returns {Observable<number>}
   */
  public run<T>(name: string, payload: any): Observable<T> {
    return this.call<T>('run', name, payload);
  }

  /**
   * Modify the driver to be used on the fly
   *
   * @param {RebasedDriverOption} name
   * @returns {RebasedCore}
   */
  public driver(name: RebasedDriverOption): RebasedCore {
    this.chain.driver = name;
    this.checkChainAvailability(this.chain.driver, 'driver');
    return this;
  }

  /**
   * Modify http request config on the fly
   *
   * @param {Function} fn
   * @returns {RebasedCore}
   * @example
   * ```ts
   * import { fetch } from '@rebased/core';
   *
   * fetch('kitty', {
   *  baseURL: 'https://api.thecatapi.com',
   *  endpoint: '/v1'
   * })
   *  .http((config)=> { // modify axios config
   *    config.headers['Authorization'] = 'Bearer xyz';
   * })
   *  .get('/images/search?size=small&mime_types=gif')
   *  .subscribe(
   *    kitty => console.log(kitty),
   *    err => console.log(err)
   *  );
   *
   * ```
   */
  public http(fn: (config: AxiosRequestConfig) => void): RebasedCore {
    this.checkChainAvailability(this.chain.driver, 'http');
    fn(this.options.httpConfig);
    return this;
  }

  /**
   * Choose whether or not to make a network request
   *
   * @param {boolean} active
   * @returns {RebasedCore}
   */
  public network(active: boolean): RebasedCore {
    this.chain.useNetwork = active;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Choose whether to use memoized results
   *
   * @param {boolean} active
   * @returns {RebasedCore}
   */
  public cache(active: boolean): RebasedCore {
    this.chain.useCache = active;
    this.checkChainAvailability(this.chain.driver, 'cache');
    return this;
  }

  /**
   * Choose whether to use cached results
   *
   * @param {boolean} active
   * @returns {RebasedCore}
   */
  public state(active: boolean): RebasedCore {
    this.chain.useState = active;
    this.checkChainAvailability(this.chain.driver, 'state');
    return this;
  }

  /**
   * Define a custom key to be used as a identifier for the result set
   *
   * @param {string} name
   * @returns {RebasedCore}
   */
  public key(name: string): RebasedCore {
    this.chain.key = name;
    this.checkChainAvailability(this.chain.driver, 'key');
    return this;
  }

  /**
   * Define a custom query
   *
   * @param {object} by
   * @returns {RebasedCore}
   */
  public query(
    by: { [key: string]: {} } | { [key: string]: {} }[]
  ): RebasedCore {
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
   * @returns {RebasedCore}
   */
  public where(field: string, operator: string, value: any): RebasedCore {
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
   * @returns {RebasedCore}
   */
  public sort(by: { [key: string]: string }): RebasedCore {
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
   * @returns {RebasedCore}
   */
  public size(value: number): RebasedCore {
    this.chain.size = value;
    this.checkChainAvailability(this.chain.driver, 'size');
    return this;
  }

  /**
   * Set an at pointer for the request
   *
   * @param {*} value
   * @returns {RebasedCore}
   */
  public at(value): RebasedCore {
    this.chain.at = value;
    this.checkChainAvailability(this.chain.driver, 'at');
    return this;
  }

  /**
   * Set an after pointer for the request
   *
   * @param {*} value
   * @returns {RebasedCore}
   */
  public after(value): RebasedCore {
    this.chain.after = value;
    this.checkChainAvailability(this.chain.driver, 'after');
    return this;
  }

  /**
   * Define a document path for a request
   *
   * @param {string} path
   * @returns {RebasedCore}
   */
  public ref(path: string): RebasedCore {
    this.chain.ref = path;
    this.checkChainAvailability(this.chain.driver, 'ref');
    return this;
  }

  /**
   * Define a document id for the request
   *
   * @param {*} value
   * @returns {RebasedCore}
   */
  public doc(value: any): RebasedCore {
    this.chain.doc = value;
    this.checkChainAvailability(this.chain.driver, 'network');
    return this;
  }

  /**
   * Populate query fields
   *
   * @param {string[]} fields
   * @returns {RebasedCore}
   */
  public include(fields: string[]): RebasedCore {
    this.chain.fields = fields;
    this.checkChainAvailability(this.chain.driver, 'include');
    return this;
  }

  /**
   * Set useMasterKey on the request
   *
   * @param {boolean} active
   * @returns {RebasedCore}
   */
  public master(active: boolean): RebasedCore {
    this.chain.useMasterKey = active;
    this.checkChainAvailability(this.chain.driver, 'master');
    return this;
  }

  /**
   * Set a session token for the request
   *
   * @param {string} session
   * @returns {RebasedCore}
   */
  public token(session: string): RebasedCore {
    this.chain.useSessionToken = session;
    this.checkChainAvailability(this.chain.driver, 'token');
    return this;
  }

  /**
   * Result as real objects
   *
   * @param {boolean} active
   * @returns {RebasedCore}
   */
  public object(active: boolean): RebasedCore {
    this.chain.useObject = active;
    this.checkChainAvailability(this.chain.driver, 'object');
    return this;
  }

  /**
   * Select custom fields
   *
   * @param {string[]} value
   * @returns {RebasedCore}
   */
  public select(value: string[]): RebasedCore {
    this.chain.select = value;
    this.checkChainAvailability(this.chain.driver, 'select');
    return this;
  }

  /**
   * Near geo query
   *
   * @example
   * fetch('locations').near('locationField', geopoint(40.0, -30.0)).find()
   * @param {string} field
   * @param {Parse.GeoPoint} geopoint
   * @param {ParseOptions.GeoPoint} geopoint
   * @returns {RebasedCore}
   */
  public near(field: string, geopoint: any): RebasedCore {
    this.chain.near = { field: field, geopoint: geopoint };
    this.checkChainAvailability(this.chain.driver, 'near');
    return this;
  }

  /**
   * Within Kilometers
   *
   * @example
   * fetch('locations').withinKilometers('locationField', geopoint(40.0, -30.0)).find()
   * @param {string} active
   * @param {ParseOptions.GeoPoint} geopoint
   * @param {number} maxDistance
   * @param {boolean} sorted
   * @returns {RebasedCore}
   */
  public withinKilometers(
    field: string,
    geopoint: any,
    maxDistance: number = 30,
    sorted: boolean = false
  ): RebasedCore {
    this.chain.withinKilometers = {
      field: field,
      geopoint: geopoint,
      method: 'withinKilometers'
    };

    this.chain.withinKilometers.maxDistance = maxDistance;
    this.chain.withinKilometers.sorted = sorted;

    this.checkChainAvailability(this.chain.driver, 'withinKilometers');
    return this;
  }

  /**
   * Within Miles
   *
   * @example
   * fetch('locations').withinMiles('locationField', geopoint(40.0, -30.0)).find()
   * will return a field
   * @param {string} active
   * @param {ParseOptions.GeoPoint} geopoint
   * @param {number} maxDistance
   * @param {boolean} sorted
   * @returns {RebasedCore}
   */
  public withinMiles(
    field: string,
    geopoint: any,
    maxDistance: number = 10,
    sorted: boolean = false
  ): RebasedCore {
    this.chain.withinMiles = {
      field: field,
      geopoint: geopoint,
      method: 'withinMiles'
    };

    this.chain.withinMiles.maxDistance = maxDistance;
    this.chain.withinMiles.sorted = sorted;

    this.checkChainAvailability(this.chain.driver, 'withinMiles');
    return this;
  }

  /**
   * diff function callback
   *
   * @param {*} fn
   * @returns {RebasedCore}
   * @memberof RebasedCore
   */
  public diff(fn): RebasedCore {
    this.chain.diff = fn;
    this.checkChainAvailability(this.chain.driver, 'diff');
    return this;
  }

  /**
   * network response callback
   *
   * @param {*} fn
   * @returns {RebasedCore}
   * @memberof RebasedCore
   */
  public response(fn): RebasedCore {
    this.chain.response = fn;
    this.checkChainAvailability(this.chain.driver, 'response');
    return this;
  }
}

export class PlatformServer extends RebasedCore {}
