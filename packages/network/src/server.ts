import {
  sha256,
  isServer,
  namespace,
  FlewChain,
  FlewChainPayload,
  FlewDriverOption,
  FlewOptions,
  FlewVerb,
  Log,
  Logger,
  SetOptions,
  FL_VERSION,
} from '@flew/core';

import { omit, isString, isArray, isEmpty } from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpDriver } from './http';

const workspace = namespace();

/**
 * @export
 * @class FlewNetwork
 */
export class FlewNetwork {
  chain: FlewChainPayload = {};
  options: FlewOptions;

  // log instance
  protected logger: Logger;

  // so external tools can listen for logs
  public $log: Subject<Log> = new Subject();

  constructor(options: FlewOptions) {
    this.init(options);
  }

  public init(runtime: FlewOptions = {}) {
    // settings which requires runtime evaluation
    const options: FlewOptions = {
      ...workspace.options,
      ...runtime,
      httpConfig: {
        ...workspace.options.httpConfig,
        ...runtime.httpConfig,
      },
    };

    // init logger
    this.logger = new Logger({
      subject: this.$log,
      silent: options.silent,
    });

    // set drivers
    this.initDrivers(options);

    // log
    const name = options.collection || options.endpoint || options.from;
    this.log().success()(`[flew ${FL_VERSION}] ${name} request`);

    // initialize
    this.options = options;
    this.reset();
  }

  private initDrivers(options: FlewOptions) {
    options.logger = this.logger;

    // install default driver
    if (!workspace.driver.http) workspace.driver.http = new HttpDriver();

    // instantiate everyone
    for (const driver of workspace.drivers) {
      workspace.driver[driver].configure(options);
    }
  }

  private checkVerbAvailability(
    _driver: FlewDriverOption,
    _verb: FlewVerb,
  ): any {
    const msg = `[${_verb}] method unavailable for driver [${_driver}]`;
    try {
      const verb = workspace.driver[_driver].verbs[_verb];
      if (verb === false) throw new Error(msg);
      return verb;
    } catch (err) {
      throw new Error(msg);
    }
  }

  private checkChainAvailability(
    _driver: FlewDriverOption,
    _chain: FlewChain,
  ): void {
    const msg = `[${_chain}] chaining method unavailable for driver ${_driver} on ${
      isServer() ? 'server' : 'browser'
    }`;
    const exists = workspace.driver[_driver].chaining[_chain];
    if (exists === false || (exists === 'browser' && isServer())) {
      return this.log().danger()(msg);
    }
  }

  protected log(): Logger {
    return this.logger;
  }

  protected createKey(verb, path, body) {
    if (this.chain.key) return this.chain.key;

    const chain = { ...this.chain };
    const options = { ...this.options };
    const payload = JSON.stringify({
      ...verb,
      ...body,
      ...{ path: path },
      ...{ driver: chain.from },
      ...omit(chain, ['key', 'useNetwork', 'useCache', 'useState']),
    });

    const keyStart = options.collection || 'flew';

    const keyEndpoint = chain.from === 'http' ? options.endpoint : '';

    const keyPath = chain.from === 'http' ? path || options.pathname : '';

    const keyCrypt = sha256(payload);

    const key = `${keyStart}://${keyCrypt}${keyEndpoint || ''}${keyPath || ''}`;

    return key;
  }

  protected call<T>(
    method: FlewVerb,
    path = '',
    payload: any = {},
    chain: FlewChainPayload = { ...this.chain },
    key = '',
  ): Observable<T> {
    this.initDrivers(this.options);

    let _verb = method;
    let _driver = chain.from;
    let arg1, arg2, arg3, arg4;

    // get verb
    const verb = this.checkVerbAvailability(_driver, _verb);

    // map to the correct option
    if (isString(verb)) {
      _driver = verb.split('.')[0] as FlewDriverOption;
      _verb = verb.split('.')[1] as FlewVerb;
    }

    if (!workspace.driver[_driver])
      throw new Error(`Whoops! Flew couldn't find the ${_driver} driver`);

    // define an unique key
    key = key ? key : this.createKey(_verb, path, payload);

    // reset the chain
    this.reset();

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

    // execute the request
    const start = Date.now();
    this.log().warn()(`${key} network request start`);
    return workspace.driver[_driver][_verb]<T>(arg1, arg2, arg3, arg4).pipe(
      tap(() => {
        const end = Date.now();
        this.log().warn()(`${key} network request end [${end - start}ms]`);
      }),
    );
  }

  /**
   * Reset the chaining configuration on the fly
   *
   * @returns {FlewNetwork}
   */
  public reset(): FlewNetwork {
    this.chain = {
      from: this.options.from,
      useCache: this.options.useCache,
      useNetwork: this.options.useNetwork,
      useState: this.options.useState,
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
  public get<T>(path = ''): Observable<T> {
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
  public post<T>(path = '', body: any = {}): Observable<T> {
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
  public patch<T>(path = '', body: any = {}): Observable<T> {
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
  public delete<T>(path = '', body?: any): Observable<T> {
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
      options: options,
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
      data: data,
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
   * @param {FlewDriverOption} driver
   * @returns {FlewNetwork}
   */
  public from(driver: FlewDriverOption): FlewNetwork {
    this.chain.from = driver;
    this.checkChainAvailability(this.chain.from, 'from');
    return this;
  }

  /**
   * Modify http request config on the fly
   *
   * @param {Function} fn
   * @returns {FlewNetwork}
   * @example
   * ```ts
   * import { fetch } from '@flew/network';
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
  public http(fn: (config: AxiosRequestConfig) => void): FlewNetwork {
    this.checkChainAvailability(this.chain.from, 'http');
    fn(this.options.httpConfig);
    return this;
  }

  /**
   * Choose whether or not to make a network request
   *
   * @param {boolean} active
   * @returns {FlewNetwork}
   */
  public network(active: boolean): FlewNetwork {
    this.chain.useNetwork = active;
    this.checkChainAvailability(this.chain.from, 'network');
    return this;
  }

  /**
   * Choose whether to use memoized results
   *
   * @param {boolean} active
   * @returns {FlewNetwork}
   */
  public cache(active: boolean): FlewNetwork {
    this.chain.useCache = active;
    this.checkChainAvailability(this.chain.from, 'cache');
    return this;
  }

  /**
   * Choose whether to use cached results
   *
   * @param {boolean} active
   * @returns {FlewNetwork}
   */
  public state(active: boolean): FlewNetwork {
    this.chain.useState = active;
    this.checkChainAvailability(this.chain.from, 'state');
    return this;
  }

  /**
   * Define a custom key to be used as a identifier for the result set
   *
   * @param {string} name
   * @returns {FlewNetwork}
   */
  public key(name: string): FlewNetwork {
    this.chain.key = name;
    this.checkChainAvailability(this.chain.from, 'key');
    return this;
  }

  /**
   * Define a custom query
   *
   * @param {object} by
   * @returns {FlewNetwork}
   */
  public query(
    by: { [key: string]: {} } | { [key: string]: {} }[],
  ): FlewNetwork {
    this.chain.query = by;
    this.checkChainAvailability(this.chain.from, 'query');
    return this;
  }

  /**
   * Constraint results
   *
   * @param {string} field
   * @param {string} operator
   * @param {*} value
   * @returns {FlewNetwork}
   */
  public where(field: string, operator: string, value: any): FlewNetwork {
    if (!isArray(this.chain.where)) {
      this.chain.where = [];
    }
    this.chain.where.push({
      field: field,
      operator: operator,
      value: value,
    });
    this.checkChainAvailability(this.chain.from, 'where');
    return this;
  }

  /**
   * Sort data
   *
   * @param {object} by
   * @returns {FlewNetwork}
   */
  public sort(by: { [key: string]: string }): FlewNetwork {
    if (isEmpty(this.chain.sort)) {
      this.chain.sort = {};
    }
    // tslint:disable-next-line
    for (const k in by) {
      this.chain.sort[k] = by[k];
    }
    this.checkChainAvailability(this.chain.from, 'sort');
    return this;
  }

  /**
   * Define the size of results
   *
   * @param {number} value
   * @returns {FlewNetwork}
   */
  public size(value: number): FlewNetwork {
    this.chain.size = value;
    this.checkChainAvailability(this.chain.from, 'size');
    return this;
  }

  /**
   * Set an at pointer for the request
   *
   * @param {*} value
   * @returns {FlewNetwork}
   */
  public at(value): FlewNetwork {
    this.chain.at = value;
    this.checkChainAvailability(this.chain.from, 'at');
    return this;
  }

  /**
   * Set an after pointer for the request
   *
   * @param {*} value
   * @returns {FlewNetwork}
   */
  public after(value): FlewNetwork {
    this.chain.after = value;
    this.checkChainAvailability(this.chain.from, 'after');
    return this;
  }

  /**
   * Define a document path for a request
   *
   * @param {string} path
   * @returns {FlewNetwork}
   */
  public ref(path: string): FlewNetwork {
    this.chain.ref = path;
    this.checkChainAvailability(this.chain.from, 'ref');
    return this;
  }

  /**
   * Define a document id for the request
   *
   * @param {*} value
   * @returns {FlewNetwork}
   */
  public doc(value: any): FlewNetwork {
    this.chain.doc = value;
    this.checkChainAvailability(this.chain.from, 'network');
    return this;
  }

  /**
   * Populate query fields
   *
   * @param {string[]} fields
   * @returns {FlewNetwork}
   */
  public include(fields: string[]): FlewNetwork {
    this.chain.fields = fields;
    this.checkChainAvailability(this.chain.from, 'include');
    return this;
  }

  /**
   * Set useMasterKey on the request
   *
   * @param {boolean} active
   * @returns {FlewNetwork}
   */
  public master(active: boolean): FlewNetwork {
    this.chain.useMasterKey = active;
    this.checkChainAvailability(this.chain.from, 'master');
    return this;
  }

  /**
   * Set a session token for the request
   *
   * @param {string} session
   * @returns {FlewNetwork}
   */
  public token(session: string): FlewNetwork {
    this.chain.useSessionToken = session;
    this.checkChainAvailability(this.chain.from, 'token');
    return this;
  }

  /**
   * Result as real objects
   *
   * @param {boolean} active
   * @returns {FlewNetwork}
   */
  public object(active: boolean): FlewNetwork {
    this.chain.useObject = active;
    this.checkChainAvailability(this.chain.from, 'object');
    return this;
  }

  /**
   * Select custom fields
   *
   * @param {string[]} value
   * @returns {FlewNetwork}
   */
  public select(value: string[]): FlewNetwork {
    this.chain.select = value;
    this.checkChainAvailability(this.chain.from, 'select');
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
   * @returns {FlewNetwork}
   */
  public near(field: string, geopoint: any): FlewNetwork {
    this.chain.near = { field: field, geopoint: geopoint };
    this.checkChainAvailability(this.chain.from, 'near');
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
   * @returns {FlewNetwork}
   */
  public withinKilometers(
    field: string,
    geopoint: any,
    maxDistance = 30,
    sorted = false,
  ): FlewNetwork {
    this.chain.withinKilometers = {
      field: field,
      geopoint: geopoint,
      method: 'withinKilometers',
    };

    this.chain.withinKilometers.maxDistance = maxDistance;
    this.chain.withinKilometers.sorted = sorted;

    this.checkChainAvailability(this.chain.from, 'withinKilometers');
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
   * @returns {FlewNetwork}
   */
  public withinMiles(
    field: string,
    geopoint: any,
    maxDistance = 10,
    sorted = false,
  ): FlewNetwork {
    this.chain.withinMiles = {
      field: field,
      geopoint: geopoint,
      method: 'withinMiles',
    };

    this.chain.withinMiles.maxDistance = maxDistance;
    this.chain.withinMiles.sorted = sorted;

    this.checkChainAvailability(this.chain.from, 'withinMiles');
    return this;
  }

  /**
   * diff function callback
   *
   * @param {*} fn
   * @returns {FlewNetwork}
   * @memberof FlewNetwork
   */
  public diff(fn): FlewNetwork {
    this.chain.diff = fn;
    this.checkChainAvailability(this.chain.from, 'diff');
    return this;
  }

  /**
   * network response callback
   *
   * @param {*} fn
   * @returns {FlewNetwork}
   * @memberof FlewNetwork
   */
  public response(fn): FlewNetwork {
    this.chain.response = fn;
    this.checkChainAvailability(this.chain.from, 'response');
    return this;
  }
}

export class FetchServer extends FlewNetwork {}
