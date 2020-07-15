import { isArray, isEmpty, isNil, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SetOptions,
  subscribe,
  Logger,
  RebasedVerb,
  RebasedChain,
  RebasedDriver,
  RebasedOptions,
  RebasedDriverOption,
  RebasedChainPayload
} from '@rebased/core';

export class FirestoreDriver implements RebasedDriver {
  driverName: RebasedDriverOption = 'firestore';
  driverOptions: RebasedOptions;
  logger: Logger;
  instance: any;

  public verbs: { [key in RebasedVerb]: string | boolean } = {
    find: true,
    findOne: true,
    on: true,
    get: 'http.get',
    post: 'http.post',
    update: true,
    patch: 'http.patch',
    delete: true,
    set: true,
    count: false,
    run: false
  };

  public chaining: { [key in RebasedChain]: string | boolean } = {
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
    select: false,
    memo: true,
    near: false,
    withinKilometers: false,
    withinMiles: false
  };

  constructor(options: any) {
    this.instance = options.instance;
  }

  getInstance() {
    return this.instance;
  }

  configure(options: RebasedOptions) {
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
    if (!this.driverOptions.from) throw new Error('missing from');
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

  public find<T>(chain: RebasedChainPayload, key: string): Observable<T[]> {
    return new Observable(observer => {
      const connector = this.getInstance();
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      let firestore: any = connector.collection(this.driverOptions.from);

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

  public findOne<T>(chain: RebasedChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map(r => (r && r.length ? r[0] : ({} as T)))
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
      let firestore: any = connector.collection(this.driverOptions.from);

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
      const unsubscription = firestore.onSnapshot(
        (snapshot: any) => {
          const data = [];
          snapshot.forEach(doc => data.push(doc.data()));
          observer.next(data as any);
        },
        err => observer.error(err)
      );

      const internalHandler = subscribe(`unsubscribe-${key}`, () => {
        unsubscription();
        internalHandler.unsubscribe();
      });
    });
  }

  public set(
    chain: RebasedChainPayload,
    data: any,
    options: SetOptions = { merge: true }
  ): Observable<any> {
    return new Observable(observer => {
      const connector = this.getInstance();
      const id = chain.doc || data.doc_id || data.id;
      const newData = { ...data };
      //
      // run exceptions
      this.exceptions();

      //
      // define connector
      const firestore: any = connector.collection(this.driverOptions.from);

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

  public update(chain: RebasedChainPayload, data: any): Observable<any> {
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
      const firestore: any = connector.collection(this.driverOptions.from);

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

  public delete<T>(
    path: string,
    key: string,
    payload: any,
    chain: RebasedChainPayload
  ): Observable<T> {
    return new Observable(observer => {
      const connector = this.getInstance();
      const id = chain.doc;

      //
      // run exceptions
      this.exceptions();

      //
      // define connector
      const firestore: any = connector.collection(this.driverOptions.from);

      //
      // define return
      const response = r => {
        observer.next(r);
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
        .delete()
        .then(response)
        .catch(error);
    });
  }
}
