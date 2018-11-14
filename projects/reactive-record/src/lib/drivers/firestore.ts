import * as moment_import from 'moment';
const moment = moment_import; // workaround for imports
import { RRDriver } from "../interfaces/rr-driver";
import { RRRequest } from "../interfaces/rr-request";
import { RRExtraOptions } from "../interfaces/rr-extra-options";
import { Observable, PartialObserver } from "rxjs";
import { merge, isEmpty, isArray } from 'lodash';

import { RRConnector } from "../interfaces/rr-connector";
import { RROptions } from "../interfaces/rr-options";
import { RRResponse } from "../interfaces/rr-response";
import { RRHooks } from "../hooks/hooks";
import { map } from "rxjs/operators";

export class RRFirestoreDriver extends RRHooks implements RRDriver {
    //
    // default params
    collection: string;
    timestamp: boolean = true;

    //
    // connectors
    connector: RRConnector = {
        firestore: {}
    };

    //
    // for unit test
    _observer: PartialObserver<any>

    constructor(options: RROptions) {
        super(options);
        merge(this, options);
    }

    private where(query: any, firestore: any) {
        if (isArray(query)) {
            console.log('where array', query[0].field, query[0].operator, query[0].value);
            query.map(q => {
                if (!(q.value)) throw (`value can't be null for firestore where`);
                firestore = firestore.where(q.field, q.operator, q.value);
            });
        } else if (<any>typeof query === 'object' && query.field && query.operator) {
            console.log('where object', query.field, query.operator, query.value);
            if (!(query.value)) throw (`value can't be null for firestore where`);
            firestore = firestore.where(query.field, query.operator, query.value);
        }
        return firestore;
    }

    private order(sort: any, firestore: any) {
        if (isArray(sort)) {
            console.log('sort array', sort);
            sort.map(s => {
                if (isEmpty(s)) throw `sort object in array can't be null`;
                for (let k in s) firestore = firestore.orderBy(k, s[k]);
            });
        } else if (<any>typeof sort === 'object') {
            console.log('sort object', sort);
            if (isEmpty(sort)) throw `sort object can't be null`;
            for (let k in sort) firestore = firestore.orderBy(k, sort[k]);
        }
        return firestore;
    }

    private limit(limit: number, firestore: any) {
        return firestore.limit(limit);
    }

    public find(request: RRRequest, RRExtraOptions?: RRExtraOptions): Observable<RRResponse> {
        return new Observable((observer: PartialObserver<any>) => {
            //
            // set default options
            const _RRExtraOptions: RRExtraOptions = { disableHook: [] };
            merge(_RRExtraOptions, RRExtraOptions);

            //
            // handlers
            let network: any, hook: any;

            //
            // define an unique key
            let key: string;

            //
            // for unit testing
            this._observer = observer;

            //
            // run exceptions for firestore
            if (!this.collection) throw 'missing collection';
            if (isEmpty(this.connector.firestore)) throw 'missing firestore connector';

            //
            // define adapter
            let firestore: any = this.connector.firestore.collection(this.collection);

            //
            // set query
            firestore = this.where(request.query, firestore);

            //
            // set order
            firestore = this.order(request.sort, firestore);

            //
            // set limit
            if (request.size) firestore = this.limit(request.size, firestore);

            //
            // set an unique identifier
            key = _RRExtraOptions.key || `${this.collection}/${JSON.stringify(request)}`;

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
                        if (hook) {
                            //
                            // run client hook
                            hook(key, response, observer, _RRExtraOptions);
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
            if (!_RRExtraOptions.useNetwork && hook) {
                //
                // run client hook
                hook(key, observer, _RRExtraOptions).then(canRequest => {
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

    public findOne(request: RRRequest, RRExtraOptions?: RRExtraOptions): Observable<RRResponse> {
        return this.find(request, RRExtraOptions).pipe(map((r: RRResponse) => <RRResponse>{ data: r.data[0], response: r.response }));
    }

    public on(request: RRRequest, onSuccess: (response: RRResponse) => any = (response: RRResponse) => { }, onError: (response: any) => any = (response: any) => { }): any {
        //
        // run exceptions
        if (!this.collection) throw 'missing collection';
        if (isEmpty(this.connector.firestore)) throw 'missing firestore connector';

        //
        // define adapter
        let firestore: any = this.connector.firestore.collection(this.collection);

        //
        // set doc
        if (request.id) firestore.doc(request.id);

        //
        // set where
        firestore = this.where(request.query, firestore);

        //
        // set order
        firestore = this.order(request.sort, firestore);

        //
        // set limit
        if (request.size) firestore = this.limit(request.size, firestore);

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
    }

    public set(id: string, data: any, merge: boolean = true): Observable<any> {
        return new Observable((observer) => {
            //
            // primary exceptions
            if (!this.collection) throw 'missing collection';
            if (isEmpty(this.connector.firestore)) throw 'missing firestore connector';
            //
            // define connector
            const firestore: any = this.connector.firestore.collection(this.collection);
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
        })
    }

    public update(id: string, data: any): Observable<any> {
        return new Observable((observer) => {
            //
            // primary exceptions
            if (!this.collection) throw 'missing collection';
            if (isEmpty(this.connector.firestore)) throw 'missing firestore connector';
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
        })
    }
}