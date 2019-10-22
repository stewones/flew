import { Observable, PartialObserver } from 'rxjs';
import { merge, isEmpty, isArray, isObject, get } from 'lodash';
import { Connector } from '../interfaces/connector';
import { Options } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { map } from 'rxjs/operators';
import { ReativeDriverOption, ReativeDriver } from '../interfaces/driver';
import { clearNetworkResponse } from '../utils/response';
import { Logger } from '../utils/logger';
import { Chain } from '../interfaces/chain';
import { Reative } from '../symbols/reative';

export class FirebaseDriver implements ReativeDriver {
  _driver: ReativeDriverOption = 'firebase';
  connector: any;
  collection: string;
  logger: Logger;

  constructor(options: Options) {
    merge(this, options);
    const connector: Connector = Reative.connector || ({} as Connector);
    this.connector = connector.firebase;
  }

  private exceptions() {
    if (!this.collection) throw new Error('missing collection');
    if (isEmpty(this.connector))
      throw new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      );
  }

  public log() {
    return this.logger;
  }

  public find<T>(chain: Chain, key: string): Observable<T> {
    return new Observable((observer: PartialObserver<any>) => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      const path = `${this.collection}/${chain.ref || ''}`;

      let firebase: any = this.connector.database().ref(path);

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
            collection: this.collection,
            driver: this._driver,
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

  public findOne<T>(chain: Chain, key: string): Observable<T> {
    return this.find<T>(chain, key).pipe(
      map((r: Response) => {
        const data = get(r, 'data[0]');
        const response: Response = {
          data: data,
          key: r.key,
          collection: this.collection,
          driver: this._driver,
          response: r.response
        };
        return response as T;
      })
    );
  }

  public on<T>(chain: Chain, key: string): Observable<T> {
    return new Observable(observer => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      const path = `${this.collection}/${chain.ref || ''}`;
      const firebase: any = this.connector.database().ref(path);

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
            collection: this.collection,
            driver: this._driver,
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
