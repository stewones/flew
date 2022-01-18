import { isArray, isEmpty, isNil, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SetOptions,
  subscribe,
  Logger,
  FlewVerb,
  FlewChain,
  FlewDriver,
  FlewOptions,
  FlewDriverOption,
  FlewChainPayload,
  guid,
  namespace,
} from '@flew/core';

const workspace = namespace();
export class FirestoreDriver implements FlewDriver {
  driverName: FlewDriverOption = 'firestore';
  driverOptions: FlewOptions;
  logger: Logger;
  instance: any;

  public verbs: { [key in FlewVerb]: string | boolean } = {
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
    run: false,
  };

  public chaining: { [key in FlewChain]: string | boolean } = {
    from: true,
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
    state: true,
    near: false,
    withinKilometers: false,
    withinMiles: false,
    diff: true,
    response: true,
  };

  constructor(options: any) {
    this.instance = options.instance;
  }

  getInstance() {
    return this.instance;
  }

  configure(options: FlewOptions) {
    const connector = this.getInstance();
    this.driverOptions = options;
    this.logger = options.logger;

    if (options.useCache !== false && options.persistence) {
      if (this.log())
        this.log().danger()(
          `[persistence + tabs] using experimental features from firestore`,
        );
      try {
        connector.enablePersistence({
          experimentalTabSynchronization: true,
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
    if (!this.driverOptions.collection) throw new Error('missing from');
  }

  protected where(query: any[] = [], firestore: any) {
    query.map(q => {
      if (isNil(q.value))
        throw Error(`value can't be null for firestore where`);
      firestore = firestore.where(q.field, q.operator, q.value);
      this.log().success()(
        `firestore where array -> ${q.field} ${q.operator} ${q.value}`,
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

  public find<T>(chain: FlewChainPayload, key: string): Observable<T[]> {
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

  public findOne<T>(chain: FlewChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map(r => (r && r.length ? r[0] : ({} as T))),
    );
  }

  public on<T>(chain: FlewChainPayload, key: string): Observable<T> {
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
      const unsubscription = firestore.onSnapshot(
        (snapshot: any) => {
          const data = [];
          snapshot.forEach(doc => data.push(doc.data()));
          observer.next(data as any);
        },
        err => observer.error(err),
      );

      const internalHandler = subscribe(`internal-${key}`, () => {
        unsubscription();
        internalHandler.unsubscribe();
      });
    });
  }

  public set(
    chain: FlewChainPayload,
    data: any,
    options: SetOptions = { merge: true },
  ): Observable<any> {
    return new Observable(observer => {
      let id = chain.doc || data[workspace.options.identifier];
      const connector = this.getInstance();
      const newData = { ...data };

      //
      // define connector
      const firestore: any = connector.collection(
        this.driverOptions.collection,
      );

      //
      // run exceptions
      this.exceptions();

      //
      // auto id generation
      if (!this.driverOptions.disableAutoID) {
        if (id) {
          newData[this.driverOptions.identifier] = id;
        } else {
          if (!newData[this.driverOptions.identifier])
            newData[this.driverOptions.identifier] = id = guid(3);
        }
      }

      //
      // auto update timestamp
      if (this.driverOptions.timestampEnabled !== false) {
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

  public update(chain: FlewChainPayload, data: any): Observable<any> {
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
        this.driverOptions.collection,
      );

      //
      // auto update timestamp
      if (this.driverOptions.timestampEnabled !== false) {
        const timestamp = this.driverOptions.timestampObject
          ? new Date()
          : new Date().toISOString();

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
      firestore.doc(id).update(newData).then(response).catch(error);
    });
  }

  public delete<T>(
    path: string,
    key: string,
    payload: any,
    chain: FlewChainPayload,
  ): Observable<T> {
    return new Observable(observer => {
      const connector = this.getInstance();
      const id = chain.doc;

      //
      // run exceptions
      this.exceptions();

      //
      // define connector
      const firestore: any = connector.collection(
        this.driverOptions.collection,
      );

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
      firestore.doc(id).delete().then(response).catch(error);
    });
  }
}
