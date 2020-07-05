import { isEmpty, isFunction, trim, omit } from 'lodash';

import {
  R_IDENTIFIER,
  Rebased,
  RebasedDriver,
  RebasedChainPayload,
  RebasedDriverOption,
  RebasedOptions,
  RebasedVerb,
  RebasedChain,
  subscribe,
  guid,
  Logger
} from '@rebased/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RebasedParseOptions } from '../interfaces/options';
import { transpileChainQuery } from '../api/transpile';
import { where } from '../api/where';
import { order } from '../api/order';
import { limit } from '../api/limit';
import { skip } from '../api/skip';
import { find as findParse } from '../api/find';
import { select } from '../api/select';
import { near } from '../api/near';
import { withinQuery } from '../api/within-query';

export class ParseDriver implements RebasedDriver {
  options: Partial<RebasedParseOptions>;
  instance: any; // parse instance
  driverName: RebasedDriverOption = 'parse';
  driverOptions: RebasedOptions = {};
  connector: any;
  logger: Logger;
  skipOnQuery = ['aggregate'];
  skipOnOperator = ['include', 'exclude'];
  specialOperators = ['or', 'and'];

  //
  // verbs tree
  public verbs: { [key in RebasedVerb]: string | boolean } = {
    find: true,
    findOne: true,
    on: true,
    get: 'parse.find',
    post: 'parse.find',
    update: 'parse.update',
    patch: 'parse.set',
    delete: true, // can use both doc_id or objectId
    set: true,
    count: true,
    run: true
  };

  //
  // chaining tree
  public chaining: { [key in RebasedChain]: string | boolean } = {
    driver: true,
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
    memo: true,
    near: true,
    withinKilometers: true,
    withinMiles: true
  };

  constructor(options: RebasedParseOptions) {
    this.options = omit(options, ['instance']);
    this.instance = options.instance;
  }

  configure(driverOptions: RebasedOptions) {
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

  public find<T>(chain: RebasedChainPayload, key: string): Observable<T[]> {
    return new Observable(observer => {
      //
      // network handle
      const error = err => {
        observer.error(err);
        observer.complete();
      };

      const success = (r: any) => {
        const response: T[] = [];
        for (const item of r) {
          // tslint:disable-next-line: deprecation
          const entry =
            isFunction(item.toJSON) && !chain.useObject ? item.toJSON() : item;
          if (!chain.useObject) {
            entry.id = entry.objectId;
          }
          response.push(entry);
        }
        observer.next(response);
        observer.complete();
      };

      findParse({
        Parse: this.getInstance(),
        chain: chain,
        from: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators,
        success: r => success(r),
        error: err => error(err)
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
      const Parse = this.getInstance();

      Rebased.bridge[key] = new Parse.Query(this.getCollectionName());

      //
      // Transpile chain query
      const specialQueries: any = transpileChainQuery(chain.query, {
        Parse: this.getInstance(),
        chain: chain,
        from: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators
      });

      //
      // Join query with connector
      if (!isEmpty(specialQueries) && this.isSpecialQuery(chain)) {
        Rebased.bridge[key] = Parse.Query.and(...specialQueries);
      } else {
        for (const q in chain.query) {
          if (isFunction(chain.query[q])) {
            Rebased.bridge[key][q](...chain.query[q]());
          } else {
            Rebased.bridge[key][q](...chain.query[q]);
          }
        }
      }

      //
      // set where
      where(chain.where, Rebased.bridge[key]);

      //
      // set order
      order(chain.sort, Rebased.bridge[key]);

      //
      // set limit
      if (chain.size) limit(chain.size, Rebased.bridge[key]);

      //
      // set include (pointers, relation, etc)
      if (chain.fields) {
        Rebased.bridge[key].include(chain.fields);
      }

      if (chain.query && chain.query.include) {
        Rebased.bridge[key].include(chain.query.include);
      }

      //
      // set skip
      if (chain.after) skip(chain.after, Rebased.bridge[key]);

      //
      // set select
      if (chain.select) select(chain.select, Rebased.bridge[key]);

      //
      // fire in the hole
      const getData = async (result?) => {
        if (isEmpty(result)) {
          result = [];
          const entries: any[] = await Rebased.bridge[key].find();
          for (const item of entries) {
            // tslint:disable-next-line: deprecation
            const entry = isFunction(item.toJSON) ? item.toJSON() : item;
            entry.id = entry.objectId;
            result.push(entry);
          }
        } else {
          result = [result];
        }
        //
        // define standard response
        return result;
      };

      Rebased.bridge[key].subscribe().then(async handler => {
        observer.next((await getData()) as T);
        handler.on('create', async object => {
          observer.next((await getData()) as T);
        });

        handler.on('update', async object => {
          observer.next((await getData()) as T);
        });

        handler.on('delete', async object => {
          observer.next((await getData()) as T);
        });

        handler.on('close', () => {
          observer.complete();
        });

        const internalHandler = subscribe(`unsubscribe-${key}`, () => {
          handler.unsubscribe();
          internalHandler.unsubscribe();
        });
      });
    });
  }

  public set(
    chain: RebasedChainPayload,
    data: any,
    options = { all: false }
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
        const id = chain.doc;
        const newData = { ...data };

        //
        // auto id generation
        if (!this.driverOptions.disableAutoID) {
          if (id) {
            newData[this.driverOptions.identifier] = id;
          } else {
            if (!newData[this.driverOptions.identifier])
              newData[this.driverOptions.identifier] = guid(3);
          }
        }

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

        connector
          .save(newData, {
            useMasterKey: chain.useMasterKey,
            sessionToken: chain.useSessionToken
          })
          .then(response)
          .catch(error);
      } else {
        const connector = Parse.Object;
        connector
          .saveAll(data, {
            useMasterKey: chain.useMasterKey,
            sessionToken: chain.useSessionToken
          })
          .then(response)
          .catch(error);
      }
    });
  }

  public run(name: string, payload: any, key: string): Observable<any> {
    return new Observable(observer => {
      const Parse = this.getInstance();
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
        .run(name, payload)
        .then(response)
        .catch(error);
    });
  }

  public update(chain: RebasedChainPayload, data: any): Observable<any> {
    return new Observable(observer => {
      const Parse = this.getInstance();

      //
      // clone state
      const newData = { ...data };

      //
      // auto update timestamp
      if (!this.driverOptions.disableTimestamp) {
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
      const id1 = new Parse.Query(this.getCollectionName());
      id1.equalTo('objectId', chain.doc);

      const id2 = new Parse.Query(this.getCollectionName());
      id2.equalTo(this.driverOptions.identifier, chain.doc);

      Parse.Query.or(id1, id2)
        .find()
        .then((r: any[] = []) => {
          if (r.length) {
            for (const k in data) {
              r[0].set(k, data[k]);
            }
            r[0]
              .save()
              .then(response)
              .catch(error);
          }
        });
    });
  }

  public count<T>(chain: RebasedChainPayload, key: string): Observable<T> {
    return new Observable(observer => {
      const Parse = this.getInstance();

      //
      // define adapter
      this.connector = new Parse.Query(this.getCollectionName());

      //
      // Transpile chain query
      const query: any = transpileChainQuery(chain.query, {
        Parse: this.getInstance(),
        chain: chain,
        from: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators
      });

      //
      // Join query with connector
      if (!isEmpty(query)) this.connector = Parse.Query.and(...query);

      //
      // set where
      where(chain.where, this.connector);

      //
      // set skip
      if (chain.after) skip(chain.after, this.connector);

      //
      // set geo queries
      if (chain.near) near(chain.near, this.connector);
      else if (chain.withinKilometers)
        withinQuery(chain.withinKilometers, this.connector);
      else if (chain.withinMiles)
        withinQuery(chain.withinMiles, this.connector);

      //
      // network handle
      const success = async data => {
        //
        // success callback
        observer.next(data);
        observer.complete();
      };

      const error = err => {
        observer.error(err);
        observer.complete();
      };

      this.connector
        .count({
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(success)
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
      const Parse = this.getInstance();

      //
      // define adapter
      this.connector = new Parse.Query(this.getCollectionName());

      //
      // add or condition when doc is set
      if (chain.doc) {
        let orQueryExtended = {
          or: [
            {
              equalTo: () => [
                this.driverOptions.identifier || R_IDENTIFIER,
                trim(chain.doc)
              ]
            },
            {
              equalTo: () => ['objectId', trim(chain.doc)]
            }
          ]
        };
        if (chain.query && chain.query.or) {
          orQueryExtended = {
            or: [...chain.query.or, ...orQueryExtended.or]
          };
        }
        chain.query = {
          ...chain.query,
          ...orQueryExtended
        };
      }

      //
      // Transpile chain query
      const query: any = transpileChainQuery(chain.query, {
        Parse: this.getInstance(),
        chain: chain,
        from: this.getCollectionName(),
        skipOnQuery: this.skipOnQuery,
        skipOnOperator: this.skipOnOperator,
        specialOperators: this.specialOperators
      });

      //
      // Join query with connector
      if (!isEmpty(query)) this.connector = Parse.Query.and(...query);

      //
      // set where
      where(chain.where, this.connector);

      //
      // set skip
      if (chain.after) skip(chain.after, this.connector);

      //
      // network handle
      const error = err => {
        observer.error(err);
        observer.complete();
      };

      const success = async (data: any[]) => {
        if (isEmpty(data)) return error({ message: `data wasn't found` });

        const list = await Parse.Object.destroyAll(data).catch(err => {
          // An error occurred while deleting one or more of the objects.
          // If this is an aggregate error, then we can inspect each error
          // object individually to determine the reason why a particular
          // object was not deleted.
          if (err.code === Parse.Error.AGGREGATE_ERROR) {
            for (let i = 0; i < err.errors.length; i++) {
              const msg =
                "Couldn't delete " +
                err.errors[i].object.id +
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
          sessionToken: chain.useSessionToken
        })
        .then(success)
        .catch(error);
    });
  }

  getCollectionName() {
    const mapping = {
      User: '_User',
      Role: '_Role',
      Session: '_Session'
    };
    const name = this.driverOptions.from;
    return mapping[name] ? mapping[name] : name;
  }

  isSpecialQuery(chain: RebasedChainPayload): boolean {
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
