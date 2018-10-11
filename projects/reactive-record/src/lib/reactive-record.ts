import * as _ from 'lodash';
import * as moment_import from 'moment';

import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import { PartialObserver } from 'rxjs';
import { map } from 'rxjs/operators';
import { RRHook } from './interfaces/rr-hook';
import { RRConnector } from './interfaces/rr-connector';
import { RROptions } from './interfaces/rr-options';
import { RRResponse } from './interfaces/rr-response';
import { RRRequest } from './interfaces/rr-request';
import { ExtraOptions } from './interfaces/extra-options';

//
// workaround for imports
const moment = moment_import;

/**
 * handle firestore/elastic/http calls
 *
 * @export
 * @class ReactiveRecord
 */
export class ReactiveRecord {
    //
    // default params
    public collection: string;
    public endpoint: string;
    private driver: string = 'firestore';

    private timestamp: boolean = true;
    private http: AxiosInstance;

    //
    // base url for elasticsearch
    private baseURL_: string;
    get baseURL() {
        return this.baseURL_;
    }
    set baseURL(string) {
        this.baseURL_ = string;
    }

    //
    // mapping for elasticsearch @todo
    // private mapping_: string;
    // get mapping() {
    //     return this.mapping_;
    // }
    // set mapping(string) {
    //     this.mapping_ = string;
    // }

    //
    // connectors
    private connector_: RRConnector = {
        firebase: {},
        firestore: {}
    };
    get connector() {
        return this.connector_;
    }
    set connector(instance) {
        this.connector_ = instance;
    }

    //
    // hooks
    private hook_: RRHook = { exception: {} };
    get hook() {
        return this.hook_;
    }
    set hook(instance) {
        this.hook_ = instance;
    }

    //
    // for unit test
    _observer: PartialObserver<any>

    /**
     * Creates an instance of RR
     * @param { RROptions } options
     * @memberof RR
     */
    constructor(options: RROptions) {
        const params: RROptions = {
            hook: {
                http: {
                    pre: (config: AxiosRequestConfig) => { }
                },
                exception: {
                    client: () => { },
                    server: () => { }
                }
            },
            connector: {
                firebase: {},
                firestore: {}
            }
        }

        //
        // set params
        _.merge(params, options);
        _.merge(this, params);

        //
        // call exceptions
        this.runHook('exception.client');
        this.runHook('exception.server');

        //
        // configure http client
        this.httpSetup();
    }

    /**
     * set hooks
     * call httpSetup() after adding any http hook
     *
     * @param {string} path
     * @param {*} hook
     * @memberof RR
     */
    public setHook(path: string, hook: any) {
        _.set(this.hook, path, hook);
    }

    /**
     * run hooks
     *
     * @param {string} path
     * @param {*} args
     * @returns {(boolean | any)}
     * @memberof RR
     */
    public runHook(path: string, ...args): boolean | any {
        const hook = this.hasHook(path);
        return hook ? hook(...args) : false;
    }

    /**
     * check whether the hook exists or not
     *
     * @param {string} path
     * @returns {(boolean | any)}
     * @memberof RR
     */
    public hasHook(path: string): boolean | any {
        const hook = _.get(this.hook, path, false);
        return hook && typeof hook === 'function' ? hook : false;
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
     * @param {ExtraOptions} [extraOptions]
     * @param {string} [driver=this.driver]
     * @returns {(Observable<RRResponse[]]>)}
     * @memberof RR
     */
    public find(request: RRRequest, extraOptions?: ExtraOptions, driver: string = this.driver): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            const _extraOptions: ExtraOptions = { disableHook: [] };
            _.merge(_extraOptions, extraOptions);

            //
            // handlers
            let network: any, hook: any;

            //
            // define an unique key
            let key: string;

            //
            // for unit test
            this._observer = observer;

            switch (driver) {
                case 'elastic':
                    //
                    // run exceptions for elastic
                    if (!this.baseURL) throw 'baseURL needed for elastic';
                    if (!this.endpoint) throw 'endpoint required for elastic';
                    if (!this.collection) throw 'missing collection';

                    //
                    // re-apply http stuff
                    this.httpSetup();

                    //
                    // find endpoint
                    const findEndpoint: string = (this.hook.find && typeof this.hook.find.endpoint === 'function') ? this.hook.find.endpoint() : '/find';

                    //
                    // set an unique identifier
                    key = _extraOptions.key || `${this.endpoint}/${this.collection}${findEndpoint}/${JSON.stringify(request)}`;

                    //
                    // set path to be requestes
                    const requestPath: string = `${this.endpoint}/${this.collection}${findEndpoint}`;

                    //
                    // network handle
                    network = () => {
                        this.http
                            .post(requestPath, request)
                            .then(async (r: AxiosResponse) => {
                                //
                                // format data
                                const data: any[] = r.data.hits.total > 0 ? r.data.hits.hits.map(hit => hit._source) : [];
                                //
                                // build standard response
                                const response: RRResponse = {
                                    data: data,
                                    response: r
                                }
                                //
                                // get after hook
                                const hook = this.hasHook('find.after');
                                //
                                // check availability
                                if (hook && !_extraOptions.disableHook.includes('find.after')) {
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
                                //
                                // error callback
                                observer.error(err.response.data ? err.response.data : err.response);
                                observer.complete();
                            });
                    }

                    //
                    // get before hook
                    hook = this.hasHook('find.before');

                    //
                    // check availability
                    if (!_extraOptions.forceNetwork && hook && !_extraOptions.disableHook.includes('find.before')) {
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

                    break;

                case 'firestore':
                    //
                    // run exceptions for firestore
                    if (!this.collection) throw 'missing collection';
                    if (_.isEmpty(this.connector.firestore)) throw 'missing firestore connector';

                    //
                    // define adapter
                    let firestore: any = this.connector.firestore.collection(this.collection);

                    //
                    // set query
                    firestore = this.setFirestoreWhere(request.query, firestore);

                    //
                    // set an unique identifier
                    key = _extraOptions.key || `${this.collection}/${JSON.stringify(request)}`;

                    //
                    // network handle
                    network = () => {
                        //
                        // fire in the hole
                        firestore
                            .get()
                            .then(async (snapshot: any) => {
                                //
                                // format data
                                let data: any[] = [];
                                snapshot.forEach((doc) => data.push(doc.data()));

                                //
                                // define standard response
                                const response: RRResponse = {
                                    data: data,
                                    response: {
                                        empty: snapshot.empty,
                                        size: snapshot.size
                                    }
                                }

                                //
                                // get after hook
                                hook = this.hasHook('find.after');

                                //
                                // check availability
                                if (hook && !_extraOptions.disableHook.includes('find.after')) {
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
                                observer.error(err);
                                observer.complete();
                            });

                    }

                    //
                    // get before hook
                    hook = this.hasHook('find.before');

                    //
                    // check availability
                    if (!_extraOptions.forceNetwork && hook && !_extraOptions.disableHook.includes('find.before')) {
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

                    break;

                // case 'firebase':
                //     if (!this.collection) throw 'missing collection';
                //     if (_.isEmpty(this.connector.firebase)) throw 'missing firebase connector';

                //     key = `${this.collection}/${JSON.stringify(request)}`;

                //     console.log('@todo implement firebase driver');

                //     break;

                default:
                    throw (`${driver} driver unavailable for now, sorry =(`);
            }


        })
    }

    /**
     * @param {RRRequest} request
     * @param {ExtraOptions} [extraOptions]
     * @param {string} [driver=this.driver]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public findOne(request: RRRequest, extraOptions?: ExtraOptions, driver: string = this.driver): Observable<RRResponse> {
        return this.find(request, extraOptions, driver).pipe(map((r: RRResponse) => <RRResponse>{ data: r.data[0], response: r.response }));
    }

    /**
     * @param {string} id
     * @param {*} data
     * @param {string} [driver=this.driver]
     * @param {boolean} [merge=true]
     * @returns {Observable<any>}
     * @memberof RR
     */
    public set(id: string, data: any, driver: string = this.driver, merge: boolean = true): Observable<any> {
        return new Observable((observer) => {
            switch (driver) {
                case 'firestore':
                    //
                    // primary exceptions
                    if (!this.collection) throw 'missing collection';
                    if (_.isEmpty(this.connector.firestore)) throw 'missing firestore connector';
                    //
                    // define connector
                    const firestore: any = this.connector.firestore.collection(this.collection);
                    //
                    // auto update timestamp
                    if (this.timestamp) data.updated_at = moment().toISOString();
                    //
                    // define return
                    const response = (r) => { observer.next(r); observer.complete() };
                    //
                    // call firestore
                    firestore
                        .doc(id)
                        .set(data, { merge: merge })
                        .then(response)
                        .catch(response);
                    break;
                default:
                    throw (`the driver ${driver} isn't implemented yet`);
            }
        })
    }

    /**
     * @param {string} id
     * @param {*} data
     * @param {string} [driver=this.driver]
     * @returns {Observable<any>}
     * @memberof RR
     */
    public update(id: string, data: any, driver: string = this.driver): Observable<any> {
        return new Observable((observer) => {
            switch (driver) {
                case 'firestore':
                    //
                    // primary exceptions
                    if (!this.collection) throw 'missing collection';
                    if (_.isEmpty(this.connector.firestore)) throw 'missing firestore connector';
                    //
                    // define connector
                    const firestore: any = this.connector.firestore.collection(this.collection);
                    //
                    // auto update timestamp
                    if (this.timestamp) data.updated_at = moment().toISOString();
                    //
                    // define return
                    const response = (r) => { observer.next(r); observer.complete() };
                    //
                    // call firestore
                    firestore
                        .doc(id)
                        .update(data)
                        .then(response)
                        .catch(response);
                    break;
                default:
                    throw (`the driver ${driver} isn't implemented yet`);
            }
        })
    }

    /**
     * Listen for data in realtime
     *
     * @param {RRRequest} request
     * @param {(response: RRResponse) => any} [onSuccess=(response: RRResponse) => { }]
     * @param {(response: any) => any} [onError=(response: any) => { }]
     * @param {string} [driver=this.driver]
     * @returns {*}
     * @memberof RR
     */
    public on(request: RRRequest, onSuccess: (response: RRResponse) => any = (response: RRResponse) => { }, onError: (response: any) => any = (response: any) => { }, driver: string = this.driver): any {
        //
        // firestore driver
        if (driver === 'firestore') {
            //
            // run exceptions
            if (!this.collection) throw 'missing collection';
            if (_.isEmpty(this.connector.firestore)) throw 'missing firestore connector';

            //
            // define adapter
            const firestore: any = this.connector.firestore.collection(this.collection);

            //
            // set doc
            if (request.id) firestore.doc(request.id);

            //
            // set where
            this.setFirestoreWhere(request.query, firestore);

            //
            // fire in the hole
            return firestore
                .onSnapshot((snapshot: any) => {
                    let data: any[] = [];
                    snapshot.forEach((doc) => data.push(doc.data()));
                    const response: RRResponse = {
                        data: data,
                        response: {
                            empty: snapshot.empty,
                            size: snapshot.size
                        }
                    }
                    //
                    // callback
                    onSuccess(response);
                }, onError);
        } else {
            throw (`${driver} driver unavailable for now, sorry =(`);
        }
    }

    /**
     * @private
     * @param {*} query
     * @param {*} firestore
     * @memberof RR
     */
    private setFirestoreWhere(query: any, firestore: any) {
        if (_.isArray(query)) {
            console.log('query where array', query[0].field, query[0].operator, query[0].value);
            query.map(q => {
                if (!(q.value)) throw (`value can't be null for firestore where`);
                firestore = firestore.where(q.field, q.operator, q.value);
            });
        } else if (<any>typeof query === 'object' && query.field && query.operator) {
            console.log('query where object', query.field, query.operator, query.value);
            if (!(query.value)) throw (`value can't be null for firestore where`);
            firestore = firestore.where(query.field, query.operator, query.value);
        }
        return firestore;
    }

    /**
     * http get 
     *
     * @param {string} path
     * @param {ExtraOptions} [extraOptions]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public get(path: string, extraOptions?: ExtraOptions): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            const _extraOptions: ExtraOptions = { disableHook: [] };
            _.merge(_extraOptions, extraOptions);

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.get.after');
                        //
                        // check availability
                        if (hook && !_extraOptions.disableHook.includes('http.get.after')) {
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
            if (!_extraOptions.forceNetwork && hook && !_extraOptions.disableHook.includes('http.get.before')) {
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
        })
    }

    /**
     * http post
     *
     * @param {string} path
     * @param {*} body
     * @param {ExtraOptions} [extraOptions={ disableHook: [] }]
     * @returns {(Observable<RRResponse>)}
     * @memberof RR
     */
    public post(path: string, body: any = {}, extraOptions: ExtraOptions = { disableHook: [] }): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<RRResponse>) => {
            //
            // set default options
            const _extraOptions: ExtraOptions = { disableHook: [] };
            _.merge(_extraOptions, extraOptions);

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.post.after');
                        //
                        // check availability
                        if (hook && !_extraOptions.disableHook.includes('http.post.after')) {
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
            if (!_extraOptions.forceNetwork && hook && !_extraOptions.disableHook.includes('http.post.before')) {
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
        })
    }


    /**
     * http patch
     *
     * @param {string} path
     * @param {*} body
     * @param {ExtraOptions} [extraOptions={ disableHook: [] }]
     * @returns {Observable<RRResponse>}
     * @memberof ReactiveRecord
     */
    public patch(path: string, body: any = {}, extraOptions: ExtraOptions = { disableHook: [] }): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            const _extraOptions: ExtraOptions = { disableHook: [] };
            _.merge(_extraOptions, extraOptions);

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
                        }
                        //
                        // get after hook
                        const hook = this.hasHook('http.patch.after');
                        //
                        // check availability
                        if (hook && !_extraOptions.disableHook.includes('http.patch.after')) {
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
            if (!_extraOptions.forceNetwork && hook && !_extraOptions.disableHook.includes('http.patch.before')) {
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
        })
    }

    delete(path: string) {

    }
}