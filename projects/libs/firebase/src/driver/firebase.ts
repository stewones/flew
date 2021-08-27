import { get, isArray, isEmpty, isObject } from 'lodash-es';
import { Observable, PartialObserver } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  RebasedChainPayload,
  RebasedDriver,
  RebasedDriverOption,
  RebasedOptions,
  Logger,
  RebasedVerb,
  RebasedChain
} from '@rebased/core';

export class FirebaseDriver implements RebasedDriver {
  driverName: RebasedDriverOption = 'firebase';
  driverOptions: RebasedOptions;

  logger: Logger;
  instance: any;

  public verbs: { [key in RebasedVerb]: string | boolean } = {
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

  public chaining: { [key in RebasedChain]: string | boolean } = {
    from: true,
    network: true,
    key: true,
    query: false,
    where: true,
    sort: false,
    size: true,
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
    select: false,
    state: true,
    near: false,
    withinKilometers: false,
    withinMiles: false,
    diff: true,
    response: true
  };

  constructor(options: any) {
    this.instance = options.instance;
  }

  configure(options: RebasedOptions) {
    this.driverOptions = options;
    this.logger = options.logger;
  }

  getInstance() {
    return this.instance;
  }

  private exceptions() {
    const connector = this.getInstance();
    if (!this.driverOptions.collection)
      throw new Error('missing fetch for firebase');
    if (isEmpty(connector))
      throw new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      );
  }

  public log() {
    return this.logger;
  }

  public find<T>(chain: RebasedChainPayload, key: string): Observable<T[]> {
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
      chain.where.forEach((it, i) => {
        if (it.operator === '==') {
          if (i === 0) {
            firebase = firebase.orderByChild(it.field);
            firebase = firebase.equalTo(it.value);
            this.log().success()(
              `firebase where -> ${it.field} ${it.operator} ${it.value}`
            );
          } else {
            this.log().warn()(
              `firebase where -> can't combine multiple where for firebase driver. used ${it.field} ${it.operator} ${it.value}`
            );
          }
        }
      });

      // add size
      if (chain.size) {
        firebase = firebase.limitToFirst(chain.size);
      }

      //
      // fire in the hole
      firebase.once(
        'value',
        async (snapshot: any) => {
          //
          // format data
          const data: T[] = [];
          const val: any = snapshot.toJSON();

          if (isObject(val)) {
            for (const k in val) {
              data.push(val[k]);
            }
          } else {
            data.push(val);
          }

          //
          // success callback
          observer.next(data);
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

  public findOne<T>(chain: RebasedChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map(r => {
        const data = get(r, 'data[0]');
        return data as T;
      })
    );
  }

  public on<T>(chain: RebasedChainPayload, key: string): Observable<T> {
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
          //
          // callback
          observer.next(snapshot.val() as T);
        },
        err => observer.error(err)
      );
    });
  }
}
