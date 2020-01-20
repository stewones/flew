import {
  isArray,
  isEmpty,
  isNil,
  isObject,
  isFunction,
  isString,
  trim
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
import { RR_IDENTIFIER } from '../global';

export class ParseDriver implements ReativeDriver {
  driverName: ReativeDriverOption = 'parse';
  driverOptions: ReativeOptions;
  connector: ConnectorParse;
  logger: Logger;
  skipOnQuery = ['aggregate'];
  skipOnOperator = ['include', 'exclude'];
  specialOperators = ['or', 'and'];

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

  protected skip(value: number) {
    this.log().success()(`parse after -> ${value}`);
    this.connector.skip(value);
  }

  protected transpileQuery(operator, chainQuery) {
    //
    // Hold queries
    let queries = [];

    //
    // Transpile special operators
    if (this.specialOperators.includes(operator)) {
      //
      // Fix chainQuery, must be an array
      // @todo: improve this so we don't need this workaround
      // on the first level chainQuery is an array here, but from the second forward is an object
      chainQuery = isArray(chainQuery) ? chainQuery : [chainQuery];

      //
      // Transpile in the query router
      const routedQuery: any = this.transpileQueryRouter(operator, chainQuery);
      queries = [...queries, ...routedQuery];
    }

    //
    // Transpile common operators
    else {
      //
      // Get operator value
      const value = chainQuery[operator] ? chainQuery[operator] : chainQuery;

      //
      // Treatment for arrays
      if (isArray(value) && !isString(value[0])) {
        value.map(it => {
          queries.push(this.createQueryByOperator(it, operator));
        });
      }

      //
      // Treatment when not array
      else {
        queries.push(this.createQueryByOperator(value, operator));
      }
    }

    return queries;
  }

  protected transpileQueryRouter(specialOperator, chainQuery) {
    //
    // Hold queries
    let queries = [];

    //
    // Transpile queries
    chainQuery.map(operators => {
      for (const operator in operators) {
        //
        // Set next new chain query
        // If our operator if a special operator this is after first level and we must send the special operator query value
        const nextChainQuery = this.specialOperators.includes(operator)
          ? operators[operator]
          : operators;

        //
        // Tranpile query
        const transpiledQueries = this.transpileQuery(operator, nextChainQuery);

        //
        // Push to queries
        queries = [...queries, ...transpiledQueries];
      }
    });

    //
    // Validate
    if (isEmpty(queries)) return queries;

    return Reative.Parse.Query[specialOperator](...queries);
  }

  protected transpileChainQuery(query) {
    //
    // Hold queries
    let queries = [];

    //
    // Set plain queries
    for (const k in query) {
      //
      // Validate skip on query operators
      if (this.skipOnQuery.includes(k)) return;
      if (this.skipOnOperator.includes(k)) continue;

      //
      // Tranpile query
      const transpiledQuery = this.transpileQuery(k, query[k]);

      //
      // Push to queries
      queries = [...queries, ...transpiledQuery];
    }

    return queries;
  }

  protected createQueryByOperator(value, operator) {
    //
    // Start query
    const query = new Reative.Parse.Query(this.getCollectionName());

    //
    // Create from a function
    if (isFunction(value)) {
      query[operator](...value());
    } else {
      query[operator](value);
    }

    return query;
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
      // Transpile chain query
      const query: any = this.transpileChainQuery(chain.query);

      //
      // Join query with connector
      if (!isEmpty(query)) {
        this.connector = Reative.Parse.Query.and(this.connector, ...query);
      }

      //
      // set include (pointers, relation, etc)
      if (chain.fields) {
        this.connector.include(chain.fields);
      }

      if (chain.query && chain.query.include) {
        this.connector.include(chain.query.include);
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
      // set skip
      if (chain.after) this.skip(chain.after);

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
        // @todo auto populate `id` on included fields - need more work
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
      // Transpile chain query
      const query: any = this.transpileChainQuery(chain.query);

      //
      // Join query with connector
      if (!isEmpty(query))
        this.connector = Reative.Parse.Query.and(this.connector, ...query);

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

      if (chain.query && chain.query.include) {
        this.connector.include(chain.query.include);
      }

      //
      // set skip
      if (chain.after) this.skip(chain.after);

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
      // Transpile chain query
      const query: any = this.transpileChainQuery(chain.query);

      //
      // Join query with connector
      if (!isEmpty(query))
        this.connector = Reative.Parse.Query.and(this.connector, ...query);

      //
      // set where
      this.where(chain.where);

      //
      // set skip
      if (chain.after) this.skip(chain.after);

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

  public delete<T>(
    path: string,
    key: string,
    payload: any,
    chain: ReativeChainPayload
  ): Observable<T> {
    return new Observable((observer: PartialObserver<T>) => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      this.connector = new Reative.Parse.Query(this.getCollectionName());

      //
      // add or condition when doc is set
      if (chain.doc) {
        let orQueryExtended = {
          or: [
            {
              equalTo: () => [
                this.driverOptions.identifier || RR_IDENTIFIER,
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
      const query: any = this.transpileChainQuery(chain.query);

      //
      // Join query with connector
      if (!isEmpty(query))
        this.connector = Reative.Parse.Query.and(this.connector, ...query);

      //
      // set where
      this.where(chain.where);

      //
      // set skip
      if (chain.after) this.skip(chain.after);

      //
      // network handle
      const success = async (data: any[]) => {
        const list = await Reative.Parse.Object.destroyAll(data).catch(
          error => {
            // An error occurred while deleting one or more of the objects.
            // If this is an aggregate error, then we can inspect each error
            // object individually to determine the reason why a particular
            // object was not deleted.
            if (error.code === Reative.Parse.Error.AGGREGATE_ERROR) {
              for (let i = 0; i < error.errors.length; i++) {
                console.log(
                  "Couldn't delete " +
                    error.errors[i].object.id +
                    'due to ' +
                    error.errors[i].message
                );
              }
            } else {
              console.log('Delete aborted because of ' + error.message);
            }
          }
        );

        //
        // define standard response
        const response: Response = {
          data: list,
          key: key,
          collection: this.getCollectionName(),
          driver: this.driverName,
          response: {}
        };

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
    const name = this.driverOptions.collection;
    return mapping[name] ? mapping[name] : name;
  }
}
