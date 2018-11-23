import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { get, merge, isEmpty, clone, cloneDeep } from 'lodash';
import { Observable, PartialObserver } from 'rxjs';
import { RROptions } from './interfaces/rr-options';
import { RRResponse } from './interfaces/rr-response';
import { RRRequest } from './interfaces/rr-request';
import { RRApi } from './interfaces/rr-api';
import { RRHooks } from './hooks/hooks';
import { RRDriver } from './interfaces/rr-driver';
import { RRFirebaseDriver } from './drivers/firebase';
import { RRFirestoreDriver } from './drivers/firestore';
import { RRExtraOptions } from './interfaces/rr-extra-options';

/**
 * handle firestore/elastic/http calls
 *
 * @export
 * @class ReactiveRecord
 */
export class ReactiveRecord extends RRHooks implements RRApi {
  //
  // default params
  private _driver: string = 'firestore';
  private _drivers: {
    firestore: RRDriver;
    firebase: RRDriver | any;
  };

  private http: AxiosInstance;
  private baseURL: string;
  private endpoint: string;

  private request: RRRequest = {};
  private extraOptions: RRExtraOptions = {};

  //
  // for unit test
  _observer: PartialObserver<any>;

  /**
   * Creates an instance for RR
   * @param { RROptions } options
   * @memberof RR
   */
  constructor(options: RROptions) {
    super(options);
    //
    // set default drivers
    this._drivers = {
      firestore: new RRFirestoreDriver(options),
      firebase: new RRFirebaseDriver(options)
    };

    //
    // extend options
    merge(this, options);

    //
    // configure http client
    this.httpSetup();
  }

  /**
   * Configure http client
   *
   * @public
   * @memberof RR
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

  /**
   * Reset RR chaining
   *
   * @private
   * @memberof ReactiveRecord
   */
  private reset(): void {
    this._driver = 'firestore';
    this.request = {};
    this.extraOptions = {};
  }

  /**
   * Search for data returning a list
   *
   * @returns {(Observable<RRResponse | any>)}
   * @memberof ReactiveRecord
   */
  public find(): Observable<RRResponse | any> {
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();

    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].find != 'function'
    )
      throw `${_driver} driver unavailable for now, sorry =(`;

    return this._drivers[_driver].find(_request, _extraOptions);
  }

  /**
   * Search for data returning an object
   *
   * @returns {(Observable<RRResponse | any>)}
   * @memberof ReactiveRecord
   */
  public findOne(): Observable<RRResponse | any> {
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();

    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].findOne != 'function'
    )
      throw `${_driver} driver unavailable for now, sorry =(`;

    return this._drivers[_driver].findOne(_request, _extraOptions);
  }

  /**
   * Persist data to database
   *
   * @param {string} id
   * @param {*} data
   * @param {boolean} [merge=true]
   * @returns {Observable<any>}
   * @memberof ReactiveRecord
   */
  public set(id: string, data: any, merge: boolean = true): Observable<any> {
    const _driver = clone(this._driver);
    this.reset();
    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].set != 'function'
    )
      throw `${_driver} driver unavailable for now, sorry =(`;
    return this._drivers[_driver].set(id, data, merge);
  }

  /**
   * Update data in database
   *
   * @param {string} id
   * @param {*} data
   * @returns {Observable<any>}
   * @memberof ReactiveRecord
   */
  public update(id: string, data: any): Observable<any> {
    const _driver = clone(this._driver);
    this.reset();
    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].update != 'function'
    )
      throw `${_driver} driver unavailable for now, sorry =(`;
    return this._drivers[_driver].update(id, data);
  }

  /**
   * Realtime requests
   *
   * @param {((response: RRResponse | any) => any)} [onSuccess=(
   *       response: RRResponse | any
   *     ) => {}]
   * @param {(response: any) => any} [onError=(response: any) => {}]
   * @returns {*}
   * @memberof ReactiveRecord
   */
  public on(
    onSuccess: (response: RRResponse | any) => any = (
      response: RRResponse | any
    ) => {},
    onError: (response: any) => any = (response: any) => {}
  ): any {
    const _request = cloneDeep(this.request);
    const _extraOptions = cloneDeep(this.extraOptions);
    const _driver = clone(this._driver);
    this.reset();
    if (
      !this._drivers[_driver] ||
      typeof this._drivers[_driver].on != 'function'
    )
      throw `${this._driver} driver unavailable for now, sorry =(`;
    return this._drivers[_driver].on(
      _request,
      onSuccess,
      onError,
      _extraOptions
    );
  }

  /**
   * http get
   *
   * @param {string} path
   * @returns {(Observable<RRResponse>)}
   * @memberof RR
   */
  public get(path: string): Observable<RRResponse | any> {
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();
    return new Observable((observer: PartialObserver<any>) => {
      //
      // call exceptions
      if (!this.baseURL) throw 'baseURL needed for [get]';
      if (!this.endpoint) throw 'endpoint required for [get]';

      //
      // re-apply http stuff
      this.httpSetup();

      //
      // set path to be requestes
      const requestPath: string = `${this.endpoint}${path}`;

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
            const response: RRResponse = {
              data: r.data,
              response: r
            };
            //
            // get after hook
            const hook = this.hasHook('http.get.after');
            //
            // check availability
            if (hook) {
              //
              // run client hook
              hook(key, response, observer, _extraOptions);
            } else {
              //
              // success callback
              observer.next(response);
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
      const hook = this.hasHook('http.get.before');
      //
      // check availability
      if (!_extraOptions.useNetwork && hook) {
        //
        // run client hook
        hook(key, observer, _extraOptions).then(canRequest => {
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

  /**
   * http post
   *
   * @param {string} path
   * @param {*} body
   * @returns {(Observable<RRResponse>)}
   * @memberof RR
   */
  public post(path: string, body: any = {}): Observable<RRResponse | any> {
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();

    return new Observable((observer: PartialObserver<RRResponse>) => {
      //
      // call exceptions
      if (!this.baseURL) throw 'baseURL needed for [post]';
      if (!this.endpoint) throw 'endpoint required for [post]';

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
            const response: RRResponse = {
              data: r.data,
              response: r
            };
            //
            // get after hook
            const hook = this.hasHook('http.post.after');
            //
            // check availability
            if (hook) {
              //
              // run client hook
              hook(key, response, observer, _extraOptions);
            } else {
              //
              // success callback
              observer.next(response);
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
      const hook = this.hasHook('http.post.before');
      //
      // check availability
      if (!_extraOptions.useNetwork && hook) {
        //
        // run client hook
        hook(key, observer, _extraOptions).then(canRequest => {
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

  /**
   * http patch
   *
   * @param {string} path
   * @param {*} body
   * @returns {Observable<RRResponse>}
   * @memberof ReactiveRecord
   */
  public patch(path: string, body: any = {}): Observable<RRResponse | any> {
    const _extraOptions = cloneDeep(this.extraOptions);
    this.reset();

    return new Observable((observer: PartialObserver<any>) => {
      //
      // call exceptions
      if (!this.baseURL) throw 'baseURL needed for [patch]';
      if (!this.endpoint) throw 'endpoint required for [patch]';

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
            const response: RRResponse = {
              data: r.data,
              response: r
            };
            //
            // get after hook
            const hook = this.hasHook('http.patch.after');
            //
            // check availability
            if (hook) {
              //
              // run client hook
              hook(key, response, observer, _extraOptions);
            } else {
              //
              // success callback
              observer.next(response);
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
      const hook = this.hasHook('http.patch.before');
      //
      // check availability
      if (!_extraOptions.useNetwork && hook) {
        //
        // run client hook
        hook(key, observer, _extraOptions).then(canRequest => {
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

  /**
   *
   * @todo
   * @param {string} path
   * @memberof ReactiveRecord
   */
  public delete(path: string) {}

  /**
   * Set current driver
   *
   * @param {string} name
   * @returns
   * @memberof ReactiveRecord
   */
  public driver(name: string) {
    this._driver = name;
    return this;
  }

  /**
   * Set whether to use network for first requests
   *
   * @param {boolean} active
   * @returns
   * @memberof ReactiveRecord
   */
  public useNetwork(active: boolean) {
    this.extraOptions.useNetwork = active;
    return this;
  }

  /**
   * Set whether to cache network responses
   *
   * @param {boolean} active
   * @returns
   * @memberof ReactiveRecord
   */
  public saveNetwork(active: boolean) {
    this.extraOptions.saveNetwork = active;
    return this;
  }

  /**
   * Set transform fn for network responses
   *
   * @param {(response: RRResponse) => any} transformFn
   * @returns
   * @memberof ReactiveRecord
   */
  public transformNetwork(transformFn: (response: RRResponse) => any) {
    this.extraOptions.transformNetwork = transformFn;
    return this;
  }

  /**
   * Set cache time to live
   *
   * @param {number} value
   * @returns
   * @memberof ReactiveRecord
   */
  public ttl(value: number) {
    this.extraOptions.ttl = value;
    return this;
  }

  /**
   * Set whether to use cache for first requests
   *
   * @param {boolean} active
   * @returns
   * @memberof ReactiveRecord
   */
  public useCache(active: boolean) {
    this.extraOptions.useCache = active;
    return this;
  }

  /**
   * Set transform fn for cache
   *
   * @param {(response: RRResponse) => any} transformFn
   * @returns
   * @memberof ReactiveRecord
   */
  public transformCache(transformFn: (response: RRResponse) => any) {
    this.extraOptions.transformCache = transformFn;
    return this;
  }

  /**
   * Set cache key
   *
   * @param {string} name
   * @returns
   * @memberof ReactiveRecord
   */
  public key(name: string) {
    this.extraOptions.key = name;
    return this;
  }

  /**
   * Set request query
   *
   * @param {({ [key: string]: {} } | { [key: string]: {} }[])} by
   * @returns
   * @memberof ReactiveRecord
   */
  public query(by: { [key: string]: {} } | { [key: string]: {} }[]) {
    this.request.query = by;
    return this;
  }

  /**
   * Set request where
   *
   * @param {string} field
   * @param {string} operator
   * @param {(string | number)} value
   * @returns
   * @memberof ReactiveRecord
   */
  public where(field: string, operator: string, value: string | number) {
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
   *
   * @param {{ [key: string]: string }} by
   * @returns
   * @memberof ReactiveRecord
   */
  public sort(by: { [key: string]: string }) {
    if (isEmpty(this.request.sort)) {
      this.request.sort = {};
    }
    for (let k in by) {
      this.request.sort[k] = by[k];
    }
    return this;
  }

  /**
   * Set request size
   *
   * @param {number} value
   * @returns
   * @memberof ReactiveRecord
   */
  public size(value: number) {
    this.request.size = value;
    return this;
  }

  /**
   * Set reference
   *
   * @param {string} path
   * @returns
   * @memberof ReactiveRecord
   */
  public ref(path: string) {
    this.extraOptions.ref = path;
    return this;
  }
}
