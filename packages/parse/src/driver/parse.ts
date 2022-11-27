import { guid, subscribe, unsubscribe } from '@flew/core';
import {
  FlewDriver,
  FlewChainPayload,
  FlewDriverOption,
  FlewOptions,
  FlewVerb,
  FlewChain,
  Logger,
} from '@flew/core';
import { isEmpty, isFunction, omit } from 'lodash';

import { Observable, map } from 'rxjs';
import { transpileChainQuery } from '../effects/transpile';
import { where } from '../effects/where';
import { order } from '../effects/order';
import { limit } from '../effects/limit';
import { skip } from '../effects/skip';
import { find } from '../effects/find';
import { select } from '../effects/select';
import { ParseOptions } from '../structure/options';

export class ParseDriver implements FlewDriver {
  options: Partial<ParseOptions>;
  instance: any; // parse instance
  driverName: FlewDriverOption = 'parse';
  driverOptions: FlewOptions = {};
  connector: any;
  logger: Logger;
  skipOnQuery = ['aggregate'];
  skipOnOperator = ['include', 'exclude'];
  specialOperators = ['or', 'and'];

  //
  // verbs tree
  public verbs: { [key in FlewVerb]: string | boolean } = {
    find: true,
    findOne: true,
    on: true,
    get: 'parse.find',
    post: 'parse.find',
    update: 'parse.update',
    patch: 'parse.update',
    put: 'parse.update',
    delete: true,
    set: true,
    count: true,
    run: true,
  };

  //
  // chaining tree
  public chaining: { [key in FlewChain]: string | boolean } = {
    from: true,
    network: true,
    key: true,
    query: true,
    where: true,
    sort: true,
    size: true,
    at: false,
    after: true,
    ref: false,
    http: false,
    include: true,
    doc: true,
    master: true,
    token: true,
    object: true,
    cache: 'browser',
    select: true,
    state: true,
    near: true,
    withinKilometers: true,
    withinMiles: true,
    diff: true,
    response: true,
    context: true,
    allowDiskUse: false,
  };

  constructor(options: ParseOptions) {
    this.options = omit(options, ['instance']);
    this.instance = options.instance;
  }

  configure(driverOptions: FlewOptions) {
    this.driverOptions = driverOptions;
    this.logger = driverOptions.logger;
    return this.getInstance();
  }

  public getInstance() {
    return this.instance;
  }

  public log() {
    return this.logger;
  }

  public find<T>(
    chain: FlewChainPayload,
    key: string,
    method = 'find',
  ): Observable<T[]> {
    return new Observable(observer => {
      //
      // network handle
      const error = err => {
        observer.error(err);
        observer.complete();
      };

      const success = (r: any) => {
        const response: T[] = [];
        if (method === 'find') {
          for (const item of r) {
            // tslint:disable-next-line: deprecation
            const entry =
              isFunction(item.toJSON) && !chain.useObject
                ? item.toJSON()
                : item;
            response.push(entry);
          }
        }

        observer.next(method === 'find' ? response : r);
        observer.complete();
      };

      find({
        Parse: this.getInstance(),
        chain: chain,
        collection: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators,
        success: r => success(r),
        error: err => error(err),
        method,
      });
    });
  }

  public findOne<T>(chain: FlewChainPayload, key: string): Observable<T> {
    chain.size = 1;
    return this.find<T>(chain, key).pipe(
      map(r => (r && r.length ? r[0] : ({} as T))),
    );
  }

  public on<T>(
    chain: FlewChainPayload,
    key: string,
    options?: {
      find?: boolean;
      enter?: boolean;
      leave?: boolean;
      create?: boolean;
      update?: boolean;
      delete?: boolean;
      wsOpen?: any;
      wsClose?: any;
    },
  ) {
    let livequeryHandler: any;
    const livequeryHandlerKey = `flew-livequery-unsubscribe-${key}`;
    subscribe(livequeryHandlerKey, () => {
      if (livequeryHandler) {
        livequeryHandler.unsubscribe();
      }
      unsubscribe(livequeryHandlerKey);
    });
    return new Observable<T[]>(subject => {
      if (isEmpty(options)) {
        options = {
          find: true,
          create: true,
          update: true,
          enter: false,
          leave: false,
          delete: false,
        };
      }

      const Parse = this.getInstance();

      let query = new Parse.Query(this.getCollectionName());

      // Transpile chain query
      const specialQueries: any = transpileChainQuery(chain.query, {
        Parse: this.getInstance(),
        chain: chain,
        collection: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators,
      });

      // Join query with connector
      if (!isEmpty(specialQueries) && this.isSpecialQuery(chain)) {
        query = Parse.Query.and(...specialQueries);
      } else {
        for (const q in chain.query) {
          if (isFunction(chain.query[q])) {
            query[key][q](...chain.query[q]());
          } else {
            query[key][q](...chain.query[q]);
          }
        }
      }

      // set where
      where(chain.where, query);

      // set order
      order(chain.sort, query);

      // set limit
      if (chain.size) limit(chain.size, query);

      // set include (pointers, relation, etc)
      if (chain.fields) {
        query.include(chain.fields);
      }

      // include can also be present on custom query
      if (chain.query && chain.query.include) {
        query.include(chain.query.include);
      }

      // set skip
      if (chain.after) skip(chain.after, query);

      // set select
      if (chain.select) select(chain.select, query);

      // find initial data
      const find = async (result?) => {
        if (isEmpty(result)) {
          result = [];
          const entries: any[] = await query.find({
            useMasterKey: chain.useMasterKey,
            sessionToken: chain.useSessionToken,
          });
          for (const item of entries) {
            const entry =
              isFunction(item.toJSON) && !chain.useObject
                ? item.toJSON()
                : item;
            result.push(entry);
          }
        } else {
          result = [result];
        }

        return result;
      };

      // load initial data
      if (options.find) {
        find().then(r => subject.next(r));
      }

      // start parse's subscription
      query.subscribe().then(async handler => {
        livequeryHandler = handler;

        handler.on('open', () => {
          if (options.wsOpen) {
            options.wsOpen(true);
          }
        });

        handler.on('close', () => {
          if (options.wsClose) {
            options.wsClose(true);
          }
        });

        handler.on('enter', async object => {
          if (options.enter) {
            const entry =
              isFunction(object.toJSON) && !chain.useObject
                ? object.toJSON()
                : object;
            subject.next([entry]);
          }
        });

        handler.on('leave', async object => {
          if (options.leave) {
            const entry =
              isFunction(object.toJSON) && !chain.useObject
                ? object.toJSON()
                : object;
            subject.next([entry]);
          }
        });

        handler.on('create', async object => {
          if (options.create) {
            const entry =
              isFunction(object.toJSON) && !chain.useObject
                ? object.toJSON()
                : object;
            subject.next([entry]);
          }
        });

        handler.on('update', async object => {
          if (options.update) {
            const entry =
              isFunction(object.toJSON) && !chain.useObject
                ? object.toJSON()
                : object;
            subject.next([entry]);
          }
        });

        handler.on('delete', async object => {
          if (options.delete) {
            const entry =
              isFunction(object.toJSON) && !chain.useObject
                ? object.toJSON()
                : object;
            subject.next([entry]);
          }
        });
      });
    });
  }

  public set(
    chain: FlewChainPayload,
    data: any,
    options = { all: false },
  ): Observable<any> {
    return new Observable(observer => {
      const Parse = this.getInstance();

      const response = r => {
        observer.next(r);
        observer.complete();
      };

      const error = err => {
        observer.error(err);
        observer.complete();
      };

      if (!options.all) {
        const connector = new Parse.Object(this.getCollectionName());
        // const id = chain.doc || data[this.driverOptions.identifier];
        const newData = { ...data };

        //
        // auto id generation
        if (!this.driverOptions.disableAutoID) {
          if (!newData[this.driverOptions.identifier])
            newData[this.driverOptions.identifier] = guid();
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

        connector
          .save(newData, {
            useMasterKey: chain.useMasterKey,
            sessionToken: chain.useSessionToken,
            context: chain.context,
          })
          .then(response)
          .catch(error);
      } else {
        const connector = Parse.Object;
        connector
          .saveAll(data, {
            useMasterKey: chain.useMasterKey,
            sessionToken: chain.useSessionToken,
            context: chain.context,
          })
          .then(response)
          .catch(error);
      }
    });
  }

  public run(
    name: string,
    payload: any,
    key: string,
    chain: FlewChainPayload,
  ): Observable<any> {
    return new Observable(observer => {
      const Parse = this.getInstance();
      const context = chain.context;
      const useMasterKey = chain.useMasterKey;
      const sessionToken = chain.useSessionToken;

      //
      // define connector
      const cloud = Parse.Cloud;

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

      cloud
        .run(name, payload, { context, useMasterKey, sessionToken })
        .then(response)
        .catch(error);
    });
  }

  public update(chain: FlewChainPayload, data: any): Observable<any> {
    return new Observable(observer => {
      const Parse = this.getInstance();

      //
      // clone state
      const newData = { ...data };

      //
      // auto update timestamp
      if (this.driverOptions.timestampEnabled !== false) {
        if (!newData[this.driverOptions.timestampUpdated]) {
          newData[this.driverOptions.timestampUpdated] = this.driverOptions
            .timestampObject
            ? new Date()
            : new Date().toISOString();
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
      // persist on cloud
      const query = new Parse.Query(this.getCollectionName());
      query.equalTo(this.driverOptions.identifier, chain.doc);

      query
        .find({
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken,
        })
        .then((r: any[] = []) => {
          if (r.length) {
            for (const k in data) {
              if (!['sessionToken'].includes(k)) {
                r[0].set(k, data[k]);
              }
            }
            r[0]
              .save(null, {
                useMasterKey: chain.useMasterKey,
                sessionToken: chain.useSessionToken,
                context: chain.context,
              })
              .then(response)
              .catch(error);
          }
        });
    });
  }

  public count<T>(chain: FlewChainPayload, key: string): Observable<any> {
    return this.find<T>(chain, key, 'count');
  }

  public delete<T>(
    path: string,
    key: string,
    payload: any,
    chain: FlewChainPayload,
  ): Observable<T> {
    return new Observable(observer => {
      const Parse = this.getInstance();

      // define initial query
      this.connector = new Parse.Query(this.getCollectionName());

      // set doc
      if (chain.doc) {
        this.connector.equalTo(this.driverOptions.identifier, chain.doc);
      }

      // set where
      where(chain.where, this.connector);

      // set skip
      if (chain.after) skip(chain.after, this.connector);

      // Transpile chain query to add more conditions when passed via query parameter
      const extendedQueries: any = transpileChainQuery(chain.query, {
        Parse: this.getInstance(),
        chain: chain,
        collection: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators,
      });

      // Join initial query with extended queries
      if (!isEmpty(extendedQueries)) {
        this.connector = Parse.Query.and(...extendedQueries);
      }

      // network handle
      const error = err => {
        observer.error(err);
        observer.complete();
      };

      const success = async (data: any[]) => {
        if (isEmpty(data)) return error({ message: 'object not found' });

        const list = await Parse.Object.destroyAll(data, {
          context: chain.context,
        }).catch(err => {
          // An error occurred while deleting one or more of the objects.
          // If this is an aggregate error, then we can inspect each error
          // object individually to determine the reason why a particular
          // object was not deleted.
          if (err.code === Parse.Error.AGGREGATE_ERROR) {
            for (let i = 0; i < err.errors.length; i++) {
              const msg =
                "Couldn't delete " +
                err.errors[i].object +
                'due to ' +
                err.errors[i].message;
              console.log(msg);
            }
          } else {
            console.log('Delete aborted because of ' + err.message);
          }
          error(err);
        });

        //
        // success callback
        observer.next(list as T);
        observer.complete();
      };

      this.connector
        .find({
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken,
        })
        .then(success)
        .catch(error);
    });
  }

  getCollectionName() {
    const mapping = {
      User: '_User',
      Role: '_Role',
      Session: '_Session',
      Installation: '_Installation',
    };
    const name = this.driverOptions.collection;
    return mapping[name] ? mapping[name] : name;
  }

  isSpecialQuery(chain: FlewChainPayload): boolean {
    const query = { ...chain.query };
    let isSpecial = false;
    for (const item in query) {
      if (this.specialOperators.includes(item)) {
        isSpecial = true;
      }
    }
    return isSpecial;
  }
}
