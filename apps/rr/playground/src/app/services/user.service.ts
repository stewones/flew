import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { Observable } from 'rxjs';
import { Log } from '@firetask/reactive-record';
import { Store } from '@ngxs/store';
import { AddLog } from '../+state/log/log.actions';

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
  name: 'users',
  endpoint: '/users'
})
export class UserService {
  $collection: ReactiveRecord;

  constructor(private store: Store) {
    // this.$collection.http((config: AxiosRequestConfig) => {
    //   config.headers['Authorization'] = `Bearer the-server-token`;
    // });

    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddLog(log));
    });
  }

  find(): Observable<User> {
    return this.$collection.find<User>();
  }

  findOne(): Observable<User> {
    return this.$collection.findOne<User>();
  }
}
