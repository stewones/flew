import { Request } from '../interfaces/request';
import { Observable, PartialObserver } from 'rxjs';
import { merge, isEmpty, get } from 'lodash';
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
    this.connector = options.connector.firebase;
  }

  private exceptions() {
    if (!this.collection) throw new Error('missing collection');
    if (isEmpty(this.connector)) throw new Error('missing firebase connector');
    if (isEmpty(this.connector.database))
      throw new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      );
  }

  public log() {
    return this.logger;
  }

  public find(
    request: Request,
    key: string,
    chain: Chain = {}
  ): Observable<Response> {
    return new Observable((observer: PartialObserver<any>) => {
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

      //
      // fire in the hole
      firebase.once(
        'value',
        async (snapshot: any) => {
          //
          // format data
          const data: any[] = [];
          const val: any = snapshot.toJSON();

          for (const k in val) {
            data.push(val[k]);
          }

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
          observer.error(err);
          observer.complete();
        }
      );
    });
  }

  public findOne(
    request: Request,
    key: string,
    chain: Chain = {}
  ): Observable<Response> {
    return this.find(request, key, chain).pipe(
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
    request: Request,
    onSuccess: (response: Response) => any = (response: Response) => {},
    onError: (response: any) => any = (response: any) => {},
    chain: Chain = {}
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
