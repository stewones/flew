import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Log } from 'libs/reactive-record/src/lib/interfaces/log';
import { Store } from '@ngrx/store';
import { PlayState } from '../+play/play.reducer';
import { AddCollectionLog } from '../+play/collection/collection.actions';

// import { AxiosRequestConfig } from 'axios';

export interface User extends Response<User> {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: 'users',
  endpoint: '/users'
})
export class UserService {
  $collection: ReactiveRecord;

  constructor(private store: Store<PlayState>) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });

    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddCollectionLog(log));
    });
  }

  find(): Observable<User> {
    return this.$collection.find<User>();
  }

  findOne(): Observable<User> {
    return this.$collection.findOne<User>();
  }
}
