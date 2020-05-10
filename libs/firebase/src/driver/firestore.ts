import { isArray, isEmpty, isNil, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetOptions } from '@reative/core';

import {
  Logger,
  ReativeVerb,
  ReativeChain,
  ReativeDriver,
  ReativeOptions,
  ReativeDriverOption,
  ReativeChainPayload
} from '@reative/core';

export class FirestoreDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'firestore';
  driverOptions: ReativeOptions;
  logger: Logger;
  instance: any;

  public verbs: { [key in ReativeVerb]: string | boolean } = {
    find: true,
    findOne: true,
    on: true,
    get: 'http.get',
    post: 'http.post',
    update: true,
    patch: 'http.patch',
    delete: 'http.delete',
    set: true,
    count: false,
    run: false
  };

  public chaining: { [key in ReativeChain]: string | boolean } = {
    driver: true,
    network: true,
    key: true,
    query: false,
    where: true,
    sort: true,
    size: true,
    at: true,
    after: true,
    ref: false,
    http: false,
    include: false,
    doc: true,
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

  getInstance() {
    return this.instance;
  }

  configure(options: ReativeOptions) {
    const connector = this.getInstance();
    this.driverOptions = options;
    this.logger = options.logger;

    //
    // @todo need more tests (capacitor showing warnings)
    if (options.useCache !== false && options.persistence) {
      if (this.log())
        this.log().danger()(
          `[persistence + tabs] using experimental features from firestore`
        );
      try {
        connector.enablePersistence({
          experimentalTabSynchronization: true
        });
      } catch (err) {}
    }
  }

  public log() {
    return this.logger;
  }

  private exceptions() {
    const connector = this.getInstance();
    if (isEmpty(connector)) throw new Error('missing firestore connector');
    if (!this.driverOptions.collection) throw new Error('missing collection');
  }

  protected where(query: any[] = [], firestore: any) {
    query.map(q => {
      if (isNil(q.value))
        throw Error(`value can't be null for firestore where`);
      firestore = firestore.where(q.field, q.operator, q.value);
      this.log().success()(
        `firestore where array -> ${q.field} ${q.operator} ${q.value}`
      );
    });
    return firestore;
  }

  protected order(sort: any, firestore: any) {
    if (isArray(sort)) {
      this.log().success()(`firestore sort array -> ${sort}`);
      sort.map(s => {
        if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
        for (const k in s) firestore = firestore.orderBy(k, s[k]);
      });
    } else if (isObject(sort)) {
      this.log().success()(`firestore sort object -> ${JSON.stringify(sort)}`);
      if (isEmpty(sort)) throw new Error(`sort object can't be null`);
      for (const k in sort) firestore = firestore.orderBy(k, sort[k]);
    }
    return firestore;
  }

  protected limit(limit: number, firestore: any) {
    this.log().success()(`firestore limit -> ${limit}`);
    return firestore.limit(limit);
  }

  public find<T>(chain: ReativeChainPayload, key: string): Observable<T[]> {
    return new Observable(observer => {
      const connector = this.getInstance();
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      let firestore: any = connector.collection(this.driverOptions.collection);

      //
      // set query
      firestore = this.where(chain.where, firestore);

      //
      // set order
      firestore = this.order(chain.sort, firestore);

      //
      // set limit
      if (chain.size) firestore = this.limit(chain.size, firestore);

      //
      // apply cursor
      if (chain.at) firestore = firestore.startAt(chain.at);
      if (chain.after) firestore = firestore.startAfter(chain.after);

      //
      // network handle
      firestore
        .get()
        .then(async (snapshot: any) => {
          //
          // check for offline results
          if (
            snapshot.empty &&
            snapshot.metadata &&
            snapshot.metadata.fromCache
          ) {
            const message = `${key} [find] whoops, looks like you're offline`;
            this.log().danger()(message);
            return observer.complete();
          }

          //
          // format data
          const data: T[] = [];
          snapshot.forEach(doc => data.push(doc.data()));

          //
          // success callback
          observer.next(data);
          observer.complete();
        })
        .catch(err => {
          try {
            observer.error(err);
            observer.complete();
          } catch (err) {}
        });
    });
  }

  public findOne<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map(r => (r && r.length ? r[0] : ({} as T)))
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
      let firestore: any = connector.collection(this.driverOptions.collection);

      //
      // set doc
      if (chain.doc) firestore.doc(chain.doc);

      //
      // set where
      firestore = this.where(chain.where, firestore);

      //
      // set order
      firestore = this.order(chain.sort, firestore);

      //
      // set limit
      if (chain.size) firestore = this.limit(chain.size, firestore);

      //
      // fire in the hole
      const turnOff = firestore.onSnapshot(
        (snapshot: any) => {
          //
          // check for offline results
          if (
            snapshot.empty &&
            snapshot.metadata &&
            snapshot.metadata.fromCache
          ) {
            const message = `${key} [on] whoops, looks like you're offline`;
            this.log().danger()(message);
            observer.complete();
            return turnOff();
          }

          const data = [];
          snapshot.forEach(doc => data.push(doc.data()));
          observer.next(data as any);
        },
        err => observer.error(err)
      );
    });
  }

  public set(
    chain: ReativeChainPayload,
    data: any,
    options: SetOptions = { merge: true }
  ): Observable<any> {
    return new Observable(observer => {
      const connector = this.getInstance();
      const id = chain.doc;
      const newData = { ...data };
      //
      // run exceptions
      this.exceptions();

      //
      // define connector
      const firestore: any = connector.collection(
        this.driverOptions.collection
      );

      //
      // auto update timestamp
      if (!this.driverOptions.disableTimestamp) {
        const timestamp = this.driverOptions.timestampObject
          ? new Date()
          : new Date().toISOString();
        if (!newData[this.driverOptions.timestampCreated]) {
          newData[this.driverOptions.timestampCreated] = timestamp;
        }
        if (!newData[this.driverOptions.timestampUpdated]) {
          newData[this.driverOptions.timestampUpdated] = timestamp;
        }
      }

      //
      // define return
      const response = r => {
        observer.next(data);
        observer.complete();
      };
      const error = err => {
        observer.error(err);
        observer.complete();
      };
      //
      // call firestore
      firestore
        .doc(id)
        .set(newData, { merge: options.merge })
        .then(response)
        .catch(error);
    });
  }

  public update(chain: ReativeChainPayload, data: any): Observable<any> {
    return new Observable(observer => {
      const connector = this.getInstance();
      const id = chain.doc;
      //
      // run exceptions
      this.exceptions();

      //
      // clone state
      const newData = { ...data };

      //
      // define connector
      const firestore: any = connector.collection(
        this.driverOptions.collection
      );

      //
      // auto update timestamp
      if (!this.driverOptions.disableTimestamp) {
        const timestamp = this.driverOptions.timestampObject
          ? new Date()
          : new Date().toISOString();
        if (!newData[this.driverOptions.timestampCreated]) {
          newData[this.driverOptions.timestampCreated] = timestamp;
        }
        if (!newData[this.driverOptions.timestampUpdated]) {
          newData[this.driverOptions.timestampUpdated] = timestamp;
        }
      }

      //
      // define return
      const response = r => {
        observer.next(newData);
        observer.complete();
      };
      const error = err => {
        observer.error(err);
        observer.complete();
      };
      //
      // call firestore
      firestore
        .doc(id)
        .update(newData)
        .then(response)
        .catch(error);
    });
  }
}
