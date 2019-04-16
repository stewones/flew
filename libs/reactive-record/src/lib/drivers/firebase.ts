import { Request } from '../interfaces/request';
import { Observable, PartialObserver } from 'rxjs';
import { merge, isEmpty } from 'lodash';
import { Connector } from '../interfaces/connector';
import { Options, ExtraOptions } from '../interfaces/options';
import { Response } from '../interfaces/response';
import { map } from 'rxjs/operators';
import { ReactiveDriverOption } from '../interfaces/driver';

export class FirebaseDriver /*implements Driver*/ {
  driver: ReactiveDriverOption = 'firebase';

  //
  // default params
  collection: string;
  timestamp = true;

  //
  // connectors
  connector: Connector = {
    firebase: {}
  };

  //
  // for unit test
  _observer: PartialObserver<any>;

  constructor(options: Options) {
    merge(this, options);
  }

  public find(
    request: Request,
    key: string,
    extraOptions?: ExtraOptions
  ): Observable<Response> {
    return new Observable((observer: PartialObserver<any>) => {
      //
      // set default options
      const _extraOptions: ExtraOptions = {};
      merge(_extraOptions, extraOptions);

      //
      // for unit testing
      this._observer = observer;

      //
      // run exceptions for firestore
      if (!this.collection) throw new Error('missing collection');
      if (isEmpty(this.connector.firebase))
        throw new Error('missing firebase connector');

      //
      // define adapter
      const path = `${this.collection}/${_extraOptions.ref}`;
      const firebase: any = this.connector.firebase.database().ref(path);

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
          const response: Response = {
            data: data,
            key: key,
            collection: this.collection,
            driver: this.driver,
            response: {
              key: snapshot.key
            }
          };

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
    extraOptions?: ExtraOptions
  ): Observable<Response> {
    return this.find(request, key, extraOptions).pipe(
      map((r: Response) => {
        const response = <Response>{
          data: r.data && r.data.length ? r.data[0] : {},
          key: r.key,
          collection: this.collection,
          driver: this.driver,
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
    extraOptions: ExtraOptions
  ): any {
    //
    // network handle
    const transformResponse: any =
      extraOptions.transformResponse &&
      typeof extraOptions.transformResponse === 'function'
        ? extraOptions.transformResponse
        : (data: Response) => data;
    //
    // run exceptions
    if (!this.collection) throw new Error('missing collection');
    if (isEmpty(this.connector.firebase))
      throw new Error('missing firebase connector');

    if (this.connector.firebase && isEmpty(this.connector.firebase.database))
      throw new Error(
        `missing database sdk. did you add import 'firebase/database' at your app environment ?`
      );

    //
    // define adapter
    const path = `${this.collection}/${extraOptions.ref}`;
    const firebase: any = this.connector.firebase.database().ref(path);

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
        const response: Response = {
          data: snapshot.val(),
          key: false,
          collection: this.collection,
          driver: this.driver,
          response: {
            empty: !snapshot.exists(),
            size: snapshot.numChildren()
          }
        };
        //
        // callback
        onSuccess(transformResponse(response));
      },
      onError
    );
  }
}
