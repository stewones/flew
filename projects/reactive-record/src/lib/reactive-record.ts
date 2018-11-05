import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { merge, isEmpty } from 'lodash';
import { Observable, PartialObserver } from 'rxjs';
import { RRExtraOptions } from './interfaces/rr-extra-options';
import { RRFirestoreDriver } from './drivers/firestore';
import { RRConnector } from './interfaces/rr-connector';
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
    private endpoint: string;
    private _driver: string = 'firestore';
    private _drivers: { firestore: RRDriver };
    private http: AxiosInstance;
    private baseURL: string;
    private RRExtraOptions: RRExtraOptions = {};
    private request: RRRequest = {};

    //
    // connectors @todo remove
    private connector: RRConnector = {
        firebase: {},
        firestore: {}
    };

    //
    // for unit test @todo remove
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
            timeout: 30 * 1000,
            headers: {},
            baseURL: this.baseURL
        }
        this.runHook('http.pre', config);
        this.http = axios.create(config);
    }

    /**
     * @param {RRRequest} request
     * @param {RRExtraOptions} [RRExtraOptions]
     * @param {string} [driver=this._driver]
     * @returns {(Observable<RRResponse[]]>)}
     * @memberof RR
     */
    public find(request: RRRequest, RRExtraOptions?: RRExtraOptions, driver: string = this._driver): Observable<RRResponse> {
        if (typeof this._drivers[driver].find != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        merge(this.RRExtraOptions, RRExtraOptions);
        return this._drivers[driver].find(this.RRExtraOptions, RRExtraOptions);
    }

    /**
     * @param {RRRequest} request
     * @param {RRExtraOptions} [RRExtraOptions]
     * @param {string} [driver=this._driver]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public findOne(request: RRRequest, RRExtraOptions?: RRExtraOptions, driver: string = this._driver): Observable<RRResponse> {
        if (typeof this._drivers[driver].findOne != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        merge(this.RRExtraOptions, RRExtraOptions);
        return this._drivers[driver].findOne(this.request, this.RRExtraOptions);
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
        if (typeof this._drivers[driver].set != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
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
        if (typeof this._drivers[driver].update != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
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
        if (typeof this._drivers[driver].on != 'function') throw (`${driver} driver unavailable for now, sorry =(`);
        merge(this.request, request);
        return this._drivers[driver].on(this.request, onSuccess, onError);
    }

    /**
     * http get 
     *
     * @param {string} path
     * @param {RRExtraOptions} [RRExtraOptions]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public get(path: string, RRExtraOptions?: RRExtraOptions): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            merge(this.RRExtraOptions, RRExtraOptions);

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
            const key = this.RRExtraOptions.key || requestPath;

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
                            hook(key, response, observer, this.RRExtraOptions);
                        } else {
                            //
                            // success callback
                            observer.next(response);
                            observer.complete();
                        }

                    })
                    .catch(err => {
                        //
                        // error callback
                        observer.error(err.response.data ? err.response.data : err.response);
                        observer.complete();
                    });
            }
            //
            // get before hook
            const hook = this.hasHook('http.get.before');
            //
            // check availability
            if (!this.RRExtraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.RRExtraOptions).then(canRequest => {
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
     * @param {RRExtraOptions} [RRExtraOptions={ disableHook: [] }]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public post(path: string, body: any = {}, RRExtraOptions: RRExtraOptions = { disableHook: [] }): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<RRResponse>) => {
            //
            // set default options
            merge(this.RRExtraOptions, RRExtraOptions);

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
            const key = this.RRExtraOptions.key || requestPath + `/${JSON.stringify(body)}`;

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
                            hook(key, response, observer, this.RRExtraOptions);
                        } else {
                            //
                            // success callback
                            observer.next(response);
                            observer.complete();
                        }

                    })
                    .catch(err => {
                        //
                        // error callback
                        observer.error(err.response.data ? err.response.data : err.response);
                        observer.complete();
                    });
            }
            //
            // get before hook
            const hook = this.hasHook('http.post.before');
            //
            // check availability
            if (!this.RRExtraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.RRExtraOptions).then(canRequest => {
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
     * @param {RRExtraOptions} [RRExtraOptions={ disableHook: [] }]
     * @returns {Observable<RRResponse>}
     * @memberof ReactiveRecord
     */
    public patch(path: string, body: any = {}, RRExtraOptions: RRExtraOptions = { disableHook: [] }): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            merge(this.RRExtraOptions, RRExtraOptions);

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
            const key = this.RRExtraOptions.key || requestPath + `/${JSON.stringify(body)}`;

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
                            hook(key, response, observer, this.RRExtraOptions);
                        } else {
                            //
                            // success callback
                            observer.next(response);
                            observer.complete();
                        }

                    })
                    .catch(err => {
                        //
                        // error callback
                        observer.error(err.response.data ? err.response.data : err.response);
                        observer.complete();
                    });
            }
            //
            // get before hook
            const hook = this.hasHook('http.patch.before');
            //
            // check availability
            if (!this.RRExtraOptions.forceNetwork && hook) {
                //
                // run client hook
                hook(key, observer, this.RRExtraOptions).then(canRequest => {
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

    public network(active: boolean) {
        this.RRExtraOptions.forceNetwork = active;
        return this;
    }

    // @todo implement
    public networkTransform(transformFn: (data: any[]) => any) {
        this.RRExtraOptions.transformNetwork = transformFn;
        return this;
    }

    public ttl(value: number) {
        this.RRExtraOptions.ttl = value;
        return this;
    }

    public cache(active: boolean) {
        this.RRExtraOptions.forceCache = active;
        return this;
    }

    public cacheTransform(transformFn: (data: any[]) => any) {
        this.RRExtraOptions.transformCache = transformFn;
        return this;
    }

    public key(name: string) {
        this.RRExtraOptions.key = name;
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