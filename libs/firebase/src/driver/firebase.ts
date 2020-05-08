import { get, isArray, isEmpty, isObject } from 'lodash';
import { Observable, PartialObserver } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ReativeChainPayload,
  ReativeDriver,
  ReativeDriverOption,
  ReativeOptions,
  Response,
  Logger,
  clearNetworkResponse,
  ReativeVerb,
  ReativeChain
} from '@reative/core';

export class FirebaseDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'firebase';
  driverOptions: ReativeOptions;

  logger: Logger;
  instance: any;

  public verbs: { [key in ReativeVerb]: string | boolean } = {
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
  };

  public chaining: { [key in ReativeChain]: string | boolean } = {
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
    http: false,
    include: false,
    doc: false,
    master: false,
    token: false,
    object: false,
    cache: 'browser',
    worker: false,
    select: false,
    memo: true,
    raw: true, // deprecated
    transform: true, // deprecated
    diff: true, // deprecated
    save: 'browser', // deprecated
    ttl: 'browser', // deprecated
    state: 'browser' // deprecated
  };

  constructor(options: any) {
    this.instance = options.instance;
  }

  configure(options: ReativeOptions) {
    this.driverOptions = options;
    this.logger = options.logger;
  }

  getInstance() {
    return this.instance;
  }

  private exceptions() {
    const connector = this.getInstance();
    if (!this.driverOptions.collection)
      throw new Error('missing collection for firebase');
    if (isEmpty(connector))
      throw new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      );
  }

  public log() {
    return this.logger;
  }

  public find<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return new Observable((observer: PartialObserver<any>) => {
      const connector = this.getInstance();
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      const path = `${this.driverOptions.collection}/${chain.ref || ''}`;

      let firebase: any = connector.database().ref(path);

      //
      // @todo add complete api
      // https://firebase.google.com/docs/reference/js/firebase.database.Query

      //
      // add where
      if (
        isArray(chain.where) &&
        isObject(chain.where[0]) &&
        chain.where[0].operator === '=='
      ) {
        firebase = firebase.orderByChild(chain.where[0].field);
        firebase = firebase.equalTo(chain.where[0].value);
        this.log().success()(
          `firebase where -> ${chain.where[0].field} ${chain.where[0].operator} ${chain.where[0].value}`
        );
      }

      //
      // fire in the hole
      firebase.once(
        'value',
        async (snapshot: any) => {
          //
          // format data
          const data: any[] = [];
          const val: any = snapshot.toJSON();

          if (isObject(val)) for (const k in val) data.push(val[k]);
          else data.push(val);

          //
          // define standard response
          const response: Response = clearNetworkResponse({
            data: data,
            key: key,
            collection: this.driverOptions.collection,
            driver: this.driverName,
            response: {}
          });

          //
          // success callback
          observer.next(response as T);
          observer.complete();
        },
        err => {
          try {
            observer.error(err);
            observer.complete();
          } catch (err) {}
        }
      );
    });
  }

  public findOne<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map((r: Response) => {
        const data = get(r, 'data[0]');
        const response: Response = {
          data: data,
          key: r.key,
          collection: this.driverOptions.collection,
          driver: this.driverName,
          response: r.response
        };
        return response as T;
      })
    );
  }

  public on<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return new Observable(observer => {
      const connector = this.getInstance();
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      const path = `${this.driverOptions.collection}/${chain.ref || ''}`;
      const firebase: any = connector.database().ref(path);

      //
      // @todo add complete api
      // https://firebase.google.com/docs/reference/js/firebase.database.Query

      // //
      // // set where
      // firestore = this.where(request.query, firestore);

      // //
      // // set order
      // firestore = this.order(request.sort, firestore);

      //
      // set limit
      // if (request.size) firestore = this.limit(request.size, firestore);

      //
      // fire in the hole
      firebase.on(
        'value',
        (snapshot: any) => {
          const response: Response = clearNetworkResponse({
            data: snapshot.val(),
            key: key,
            collection: this.driverOptions.collection,
            driver: this.driverName,
            response: {
              empty: !snapshot.exists(),
              size: snapshot.numChildren()
            }
          });
          //
          // callback
          observer.next(response as T);
        },
        err => observer.error(err)
      );
    });
  }
}
