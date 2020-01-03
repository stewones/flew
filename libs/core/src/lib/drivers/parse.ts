import {
  isArray,
  isEmpty,
  isNil,
  isObject,
  isFunction,
  isString
} from 'lodash';
import { Observable, PartialObserver } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetOptions } from '../interfaces/api';
import { ReativeChainPayload } from '../interfaces/chain';
import { ConnectorParse } from '../interfaces/connector';
import { ReativeDriver, ReativeDriverOption } from '../interfaces/driver';
import { ReativeOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { Reative } from '../symbols/reative';
import { subscribe } from '../utils/events';
import { guid } from '../utils/guid';
import { Logger } from '../utils/logger';
import { clearNetworkResponse } from '../utils/response';

export class ParseDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'parse';
  driverOptions: ReativeOptions;
  connector: ConnectorParse;
  logger: Logger;
  skipOnQuery = ['aggregate', 'or'];

  constructor(options: ReativeOptions) {
    this.driverOptions = options;
    this.logger = options.logger;
  }

  public log() {
    return this.logger;
  }

  private exceptions() {
    if (!this.getCollectionName()) throw new Error('missing collection name');
  }

  protected where(query: any[] = []) {
    const mapping = {
      id: 'objectId'
    };
    query.map(q => {
      if (isNil(q.value)) throw Error(`value can't be null for parse where`);

      if (mapping[q.field]) q.field = mapping[q.field];

      this.setWhere(q);
      this.log().success()(
        `parse where -> ${q.field} ${q.operator} ${
          q.value && q.value.id ? q.value.id : q.value
        }`
      );
    });
  }

  protected setWhere(q: any) {
    switch (q.operator) {
      case '==':
        this.connector.equalTo(q.field, q.value);
        break;

      case '>=':
        this.connector.greaterThanOrEqualTo(q.field, q.value);
        break;

      case '<=':
        this.connector.lessThanOrEqualTo(q.field, q.value);
        break;

      case '>':
        this.connector.greaterThan(q.field, q.value);
        break;

      case '<':
        this.connector.lessThan(q.field, q.value);
        break;

      case 'array-contains':
        this.connector.containedIn(
          q.field,
          isArray(q.value) ? q.value : [q.value]
        );
        break;

      default:
        break;
    }
  }

  protected order(sort: any) {
    if (isArray(sort)) {
      this.log().success()(`parse sort array -> ${sort}`);
      sort.map(s => {
        if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
        for (const k in s) {
          if (s[k] === 'asc') {
            this.connector.ascending(k);
          }
          if (s[k] === 'desc') {
            this.connector.descending(k);
          }
        }
      });
    } else if (isObject(sort)) {
      this.log().success()(`parse sort object -> ${JSON.stringify(sort)}`);
      if (isEmpty(sort)) throw new Error(`sort object can't be null`);
      for (const k in sort) {
        if (sort[k] === 'asc') {
          this.connector.ascending(k);
        }
        if (sort[k] === 'desc') {
          this.connector.descending(k);
        }
      }
    }
  }

  protected limit(limit: number) {
    this.log().success()(`parse limit -> ${limit}`);
    this.connector.limit(limit);
  }

  public find<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return new Observable((observer: PartialObserver<T>) => {
      const verb =
        chain.query && chain.query['aggregate']
          ? 'aggregate'
          : chain.query && chain.query['or']
          ? 'or'
          : 'find';

      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      this.connector = new Reative.Parse.Query(this.getCollectionName());

      //
      // set arbitrary query
      for (const k in chain.query) {
        if (!this.skipOnQuery.includes(k)) {
          const value = chain.query[k];
          if (isArray(value) && !isString(value[0])) {
            value.map(it => {
              if (isFunction(it)) {
                this.connector[k](...it());
              } else {
                this.connector[k](it);
              }
            });
          } else {
            if (isFunction(value)) {
              this.connector[k](...value());
            } else {
              this.connector[k](value);
            }
          }
        }
      }

      //
      // set where
      this.where(chain.where);

      //
      // set order
      this.order(chain.sort);

      //
      // set limit
      if (chain.size) this.limit(chain.size);

      //
      // set include (pointers, relation, etc)
      if (chain.fields) {
        this.connector.include(chain.fields);
      }

      //
      // network handle
      const success = async (data: any[]) => {
        const result = [];
        for (const item of data) {
          // tslint:disable-next-line: deprecation
          const entry =
            isFunction(item.toJSON) && !chain.useObject ? item.toJSON() : item;

          if (!chain.useObject) {
            // @todo add id for nested results
            entry.id = entry.objectId;
          }
          result.push(entry);
        }

        //
        // populade `id` on included fields @todo need more work
        // if (chain.fields && chain.fields.length) {
        //   result.map(entry => {
        //     chain.fields.map(field => {
        //       const whatever: any = get(entry, field);
        //       if (isArray(whatever)) {
        //         whatever.map(it => {
        //           it.id = it.objectId;
        //         });
        //       }
        //       if (isObject(whatever)) {
        //         whatever.id = whatever.objectId;
        //       }
        //     });
        //   });
        // }

        //
        // define standard response
        const response: Response = clearNetworkResponse({
          data: result,
          key: key,
          collection: this.getCollectionName(),
          driver: this.driverName,
          response: {
            empty: !result.length,
            size: result.length
          }
        });

        //
        // success callback
        observer.next(response as T);
        observer.complete();
      };

      const error = err => {
        // this breaks offline requests
        // try {
        //   observer.error(err);
        //   observer.complete();
        // } catch (err) {}
      };

      switch (verb) {
        case 'aggregate':
          this.connector
            .aggregate(chain.query['aggregate'], {
              useMasterKey: chain.useMasterKey,
              sessionToken: chain.useSessionToken
            })
            .then(success)
            .catch(error);
          break;
        case 'or':
          const execute = [];

          chain.query.or.map(item => {
            for (const k in item) {
              const value = item[k];
              if (isArray(value)) {
                value.map(it => {
                  if (isFunction(it)) {
                    const q = new Reative.Parse.Query(this.getCollectionName());
                    q[k](...it());
                    execute.push(q);
                  } else {
                    const q = new Reative.Parse.Query(this.getCollectionName());
                    q[k](it);
                    execute.push(q);
                  }
                });
              } else {
                if (isFunction(value)) {
                  const q = new Reative.Parse.Query(this.getCollectionName());
                  q[k](...value());
                  execute.push(q);
                } else {
                  const q = new Reative.Parse.Query(this.getCollectionName());
                  q[k](value);
                  execute.push(q);
                }
              }
            }
          });

          Reative.Parse.Query.or(...execute)
            .find({
              useMasterKey: chain.useMasterKey,
              sessionToken: chain.useSessionToken
            })
            .then(success)
            .catch(error);

          break;

        default:
          this.connector
            .find({
              useMasterKey: chain.useMasterKey,
              sessionToken: chain.useSessionToken
            })
            .then(success)
            .catch(error);
          break;
      }
    });
  }

  public findOne<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map((r: Response) => {
        const response: Response = <Response>{
          data: r.data && r.data.length ? r.data[0] : {},
          key: r.key,
          collection: this.getCollectionName(),
          driver: this.driverName,
          response: r.response
        };

        return response as T;
      })
    );
  }

  public on<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return new Observable(observer => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      this.connector = new Reative.Parse.Query(this.getCollectionName());

      //
      // set arbitrary query
      for (const k in chain.query) {
        if (!this.skipOnQuery.includes(k)) {
          const value = chain.query[k];
          if (isArray(value) && !isString(value[0])) {
            value.map(it => {
              if (isFunction(it)) {
                this.connector[k](...it());
              } else {
                this.connector[k](it);
              }
            });
          } else {
            if (isFunction(value)) {
              this.connector[k](...value());
            } else {
              this.connector[k](value);
            }
          }
        }
      }

      //
      // set where
      this.where(chain.where);

      //
      // set order
      this.order(chain.sort);

      //
      // set limit
      if (chain.size) this.limit(chain.size);

      //
      // fire in the hole
      const getData = async (result?) => {
        if (isEmpty(result)) {
          result = [];
          const entries: any[] = await this.connector.find();
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
        return clearNetworkResponse({
          data: result,
          key: key,
          collection: this.getCollectionName(),
          driver: this.driverName,
          response: {
            empty: !result.length,
            size: result.length
          }
        } as Response);
      };

      // for test
      // observer.next({
      //   data: [{ a: 1 }],
      //   key: key,
      //   collection: this.collection,
      //   driver: this.driverName,
      //   response: {}
      // } as any);

      // observer.next({
      //   data: [{ a: 2 }],
      //   key: key,
      //   collection: this.collection,
      //   driver: this.driverName,
      //   response: {}
      // } as any);

      this.connector.subscribe().then(async handler => {
        observer.next((await getData()) as T);
        handler.on('create', async object => {
          // console.log(`create`, object);
          // observer.next((await getData(object.toJSON())) as T);
          observer.next((await getData()) as T);
        });

        handler.on('update', async object => {
          // console.log(`update`, object);
          // observer.next((await getData(object.toJSON())) as T);
          observer.next((await getData()) as T);
        });

        handler.on('delete', async object => {
          // console.log(`delete`, object);
          // observer.next((await getData(object.toJSON())) as T);
          observer.next((await getData()) as T);
        });

        handler.on('close', () => {
          console.log('close');
          observer.complete();
        });

        subscribe(`unsubscribe-${key}`, () => {
          handler.unsubscribe();
        });
      });
    });
  }

  public set(
    chain: ReativeChainPayload,
    data: any,
    options?: SetOptions
  ): Observable<any> {
    return new Observable(observer => {
      const id = chain.doc;
      const newData = { ...data };

      if (id) {
        newData[this.driverOptions.identifier] = id;
      } else {
        if (!data[this.driverOptions.identifier])
          newData[this.driverOptions.identifier] = guid(3);
      }

      //
      // auto update timestamp
      if (this.driverOptions.timestamp) {
        if (!data[this.driverOptions.timestampCreated]) {
          newData[
            this.driverOptions.timestampCreated
          ] = new Date().toISOString();
        }
      }

      //
      // run exceptions
      this.exceptions();

      //
      // define connector
      const model = new Reative.Parse.Object(this.getCollectionName());

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
      //
      model
        .save(newData, {
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(response)
        .catch(error);
    });
  }

  public update(chain: ReativeChainPayload, data: any): Observable<any> {
    return new Observable(observer => {
      //
      // run exceptions
      this.exceptions();

      //
      // clone state
      const newData = { ...data };

      //
      // auto update timestamp
      if (this.driverOptions.timestamp) {
        if (!data[this.driverOptions.timestampUpdated]) {
          newData[
            this.driverOptions.timestampUpdated
          ] = new Date().toISOString();
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
      const id1 = new Reative.Parse.Query(this.getCollectionName());
      id1.equalTo('objectId', chain.doc);

      const id2 = new Reative.Parse.Query(this.getCollectionName());
      id2.equalTo(this.driverOptions.identifier, chain.doc);

      Reative.Parse.Query.or(id1, id2)
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

  public count<T>(chain: ReativeChainPayload, key: string): Observable<T> {
    return new Observable((observer: PartialObserver<T>) => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      this.connector = new Reative.Parse.Query(this.getCollectionName());

      //
      // set arbitrary query
      for (const k in chain.query) {
        if (!this.skipOnQuery.includes(k)) {
          const value = chain.query[k];
          // tslint:disable-next-line: deprecation
          if (isFunction(value)) {
            this.connector[k](...value());
          } else {
            this.connector[k](value);
          }
        }
      }

      //
      // set where
      this.where(chain.where);

      //
      // network handle
      const success = async (data: any[]) => {
        //
        // define standard response
        const response: Response = clearNetworkResponse({
          data: data,
          key: key,
          collection: this.getCollectionName(),
          driver: this.driverName,
          response: {}
        });

        //
        // success callback
        observer.next(response as T);
        observer.complete();
      };

      const error = err => {
        // this breaks offline requests
        // try {
        //   observer.error(err);
        //   observer.complete();
        // } catch (err) {}
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

  getCollectionName() {
    const mapping = {
      User: '_User',
      Role: '_Role',
      Session: '_Session'
    };
    const name = this.driverOptions.collection;
    return mapping[name] ? mapping[name] : name;
  }
}
