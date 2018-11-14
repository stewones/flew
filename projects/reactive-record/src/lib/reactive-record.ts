import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { get, merge, isEmpty } from 'lodash';
import { Observable, PartialObserver } from 'rxjs';
import { RRExtraOptions } from './interfaces/rr-extra-options';
import { RRFirestoreDriver } from './drivers/firestore';
import { RROptions } from './interfaces/rr-options';
import { RRResponse } from './interfaces/rr-response';
import { RRRequest } from './interfaces/rr-request';
import { RRApi } from './interfaces/rr-api';
import { RRHooks } from './hooks/hooks';
import { RRDriver } from './interfaces/rr-driver';



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
    private _drivers: { firestore: RRDriver };

    private http: AxiosInstance;
    private baseURL: string;
    private endpoint: string;

    private request: RRRequest = {};
    private extraOptions: RRExtraOptions = {};

    //
    // for unit tests
    _observer: PartialObserver<any>

    /**
     * Creates an instance of RR
     * @param { RROptions } options
     * @memberof RR
     */
    constructor(options: RROptions) {
        super(options);
        //
        // set default drivers
        this._drivers = { firestore: new RRFirestoreDriver(options) };

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
        }
        this.runHook('http.pre', config);
        this.http = axios.create(config);
    }


    /**
     * @param {RRRequest} request
     * @param {RRExtraOptions} [extraOptions]
     * @param {string} [driver=this._driver]
     * @returns {Observable<RRResponse>}
     * @memberof ReactiveRecord
     */
    public find(request: RRRequest, extraOptions?: RRExtraOptions, driver: string = this._driver): Observable<RRResponse | any> {
        if (!this._drivers[driver] || typeof this._drivers[driver].find != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        merge(this.extraOptions, extraOptions);
        return this._drivers[driver].find(this.request, this.extraOptions);
    }

    /**
     * @param {RRRequest} request
     * @param {RRExtraOptions} [extraOptions]
     * @param {string} [driver=this._driver]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public findOne(request: RRRequest, extraOptions?: RRExtraOptions, driver: string = this._driver): Observable<RRResponse | any> {
        if (!this._drivers[driver] || typeof this._drivers[driver].findOne != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        merge(this.extraOptions, extraOptions);
        return this._drivers[driver].findOne(this.request, this.extraOptions);
    }

    /**
     * @param {string} id
     * @param {*} data
     * @param {string} [driver=this._driver]
     * @param {boolean} [merge=true]
     * @returns {Observable<any>}
     * @memberof RR
     */
    public set(id: string, data: any, driver: string = this._driver, merge: boolean = true): Observable<any> {
        if (!this._drivers[driver] || typeof this._drivers[driver].set != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        return this._drivers[driver].set(id, data, merge);
    }

    /**
     * @param {string} id
     * @param {*} data
     * @param {string} [driver=this._driver]
     * @returns {Observable<any>}
     * @memberof RR
     */
    public update(id: string, data: any, driver: string = this._driver): Observable<any> {
        if (!this._drivers[driver] || typeof this._drivers[driver].update != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        return this._drivers[driver].update(id, data);
    }

    /**
     * Listen for data in realtime
     *
     * @param {RRRequest} request
     * @param {(response: RRResponse) => any} [onSuccess=(response: RRResponse) => { }]
     * @param {(response: any) => any} [onError=(response: any) => { }]
     * @param {string} [driver=this._driver]
     * @returns {*}
     * @memberof RR
     */
    public on(request: RRRequest, onSuccess: (response: RRResponse) => any = (response: RRResponse) => { }, onError: (response: any) => any = (response: any) => { }, driver: string = this._driver): any {
        if (!this._drivers[driver] || typeof this._drivers[driver].on != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        return this._drivers[driver].on(this.request, onSuccess, onError);
    }

    /**
     * http get 
     *
     * @param {string} path
     * @param {RRExtraOptions} [extraOptions]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public get(path: string, extraOptions?: RRExtraOptions): Observable<RRResponse | any> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            merge(this.extraOptions, extraOptions);

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
            const key = this.extraOptions.key || requestPath;

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.get.after');
                        //
                        // check availability
                        if (hook) {
                            //
                            // run client hook
                            hook(key, response, observer, this.extraOptions);
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
            }
            //
            // get before hook
            const hook = this.hasHook('http.get.before');
            //
            // check availability
            if (!this.extraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.extraOptions).then(canRequest => {
                    //
                    // http.get.before should return a boolean
                    if (canRequest) network();
                });
            } else {
                //
                // otherwise
                network();
            }
        })
    }

    /**
     * http post
     *
     * @param {string} path
     * @param {*} body
     * @param {RRExtraOptions} [RRExtraOptions={  }]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public post(path: string, body: any = {}, extraOptions: RRExtraOptions = {}): Observable<RRResponse | any> {
        return new Observable((observer: PartialObserver<RRResponse>) => {
            //
            // set default options
            merge(this.extraOptions, extraOptions);

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
            const key = this.extraOptions.key || requestPath + `/${JSON.stringify(body)}`;

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.post.after');
                        //
                        // check availability
                        if (hook) {
                            //
                            // run client hook
                            hook(key, response, observer, this.extraOptions);
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
            }
            //
            // get before hook
            const hook = this.hasHook('http.post.before');
            //
            // check availability
            if (!this.extraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.extraOptions).then(canRequest => {
                    //
                    // http.get.before should return a boolean
                    if (canRequest) network();
                });
            } else {
                //
                // otherwise
                network();
            }
        })
    }

    /**
     * http patch
     *
     * @param {string} path
     * @param {*} body
     * @param {RRExtraOptions} [RRExtraOptions={  }]
     * @returns {Observable<RRResponse>}
     * @memberof ReactiveRecord
     */
    public patch(path: string, body: any = {}, extraOptions: RRExtraOptions = {}): Observable<RRResponse | any> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            merge(this.extraOptions, extraOptions);

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
            const key = this.extraOptions.key || requestPath + `/${JSON.stringify(body)}`;

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.patch.after');
                        //
                        // check availability
                        if (hook) {
                            //
                            // run client hook
                            hook(key, response, observer, this.extraOptions);
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
            }
            //
            // get before hook
            const hook = this.hasHook('http.patch.before');
            //
            // check availability
            if (!this.extraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.extraOptions).then(canRequest => {
                    //
                    // http.get.before should return a boolean
                    if (canRequest) network();
                });
            } else {
                //
                // otherwise
                network();
            }
        })
    }

    // @todo
    public delete(path: string) { }

    //
    // RR API

    public driver(name: string) {
        this._driver = name;
        return this;
    }

    public useNetwork(active: boolean) {
        this.extraOptions.forceNetwork = active;
        return this;
    }

    public saveNetwork(active: boolean) {
        this.extraOptions.saveNetwork = active;
        return this;
    }

    public transformNetwork(transformFn: (response: RRResponse) => any) {
        this.extraOptions.transformNetwork = transformFn;
        return this;
    }

    public ttl(value: number) {
        this.extraOptions.ttl = value;
        return this;
    }

    public useCache(active: boolean) {
        this.extraOptions.useCache = active;
        return this;
    }

    public transformCache(transformFn: (response: RRResponse) => any) {
        this.extraOptions.transformCache = transformFn;
        return this;
    }

    public key(name: string) {
        this.extraOptions.key = name;
        return this;
    }

    public query(by: { [key: string]: {} }) {
        this.request.query = by;
        return this;
    }

    public where(field: string, operator: string, value: string | number) {
        if (isEmpty(this.request.query)) {
            this.request.query = [];
        }
        this.request.query.push({
            field: field,
            operator: operator,
            value: value
        })
        return this;
    }

    public sort(by: { [key: string]: string }) {
        if (isEmpty(this.request.sort)) {
            this.request.sort = {};
        }
        for (let k in by) {
            this.request.sort[k] = by[k]
        }
        return this;
    }

    public size(value: number) {
        this.request.size = value;
        return this;
    }
}