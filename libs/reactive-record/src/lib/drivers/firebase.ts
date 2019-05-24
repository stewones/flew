import { Observable, PartialObserver } from 'rxjs';
import { merge, isEmpty, isArray, isObject, get } from 'lodash';
import { Connector } from '../interfaces/connector';
import { Options, Chain } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { map } from 'rxjs/operators';
import { ReactiveDriverOption, ReactiveDriver } from '../interfaces/driver';
import { clearNetworkResponse } from '../utils/response';
import { Logger } from '../utils/logger';

export class FirebaseDriver implements ReactiveDriver {
  _driver: ReactiveDriverOption = 'firebase';
  connector: Connector = {};
  collection: string;
  logger: Logger;

  constructor(options: Options) {
    merge(this, options);
    const connector = get(options, 'connector') || {};
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

  public find(chain: Chain, key: string): Observable<Response> {
    return new Observable((observer: PartialObserver<any>) => {
      //
      // run exceptions
      this.exceptions();

      //
      // define adapter
      const path = `${this.collection}/${chain.ref || ''}`;

      let firebase: any = this.connector.ref(path);

      //
      // @todo add complete api
      // https://firebase.google.com/docs/reference/js/firebase.database.Query

      //
      // add where
      if (
        isArray(chain.query) &&
        isObject(chain.query[0]) &&
        chain.query[0].operator === '=='
      ) {
        firebase = firebase.orderByChild(chain.query[0].field);
        firebase = firebase.equalTo(chain.query[0].value);
        this.log().success()(
          `firebase where -> ${chain.query[0].field} ${
            chain.query[0].operator
          } ${chain.query[0].value}`
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
          observer.next(response);
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

  public findOne(chain: Chain, key: string): Observable<Response> {
    return this.find(chain, key).pipe(
      map((r: Response) => {
        const data = get(r, 'data[0]');
        const response: Response = <Response>{
          data: data,
          key: r.key,
          collection: this.collection,
          driver: this._driver,
          response: r.response
        };
        return response;
      })
    );
  }

  public on(
    chain: Chain,
    onSuccess: (response: Response) => any = (response: Response) => {},
    onError: (response: any) => any = (response: any) => {}
  ): any {
    //
    // run exceptions
    this.exceptions();

    //
    // network handle
    const transformResponse: any =
      chain.transformResponse && typeof chain.transformResponse === 'function'
        ? chain.transformResponse
        : (data: Response) => data;

    //
    // define adapter
    const path = `${this.collection}/${chain.ref || ''}`;
    const firebase: any = this.connector.ref(path);

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
    return firebase.on(
      'value',
      (snapshot: any) => {
        const response: Response = clearNetworkResponse({
          data: snapshot.val(),
          key: false,
          collection: this.collection,
          driver: this._driver,
          response: {
            empty: !snapshot.exists(),
            size: snapshot.numChildren()
          }
        });
        //
        // callback
        onSuccess(transformResponse(response));
      },
      onError
    );
  }
}
