import { Injectable } from '@angular/core';
import {
  Collection,
  Records,
  Response
} from '@reactive/records';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { AxiosRequestConfig } from 'axios';

export interface UserServer extends Response<UserServer> {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'users',
  endpoint: '/users',
  useCache: false // to force the use of server platform
})
export class UserServerService {
  $collection: Records;

  constructor() {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }

  find(): Observable<UserServer> {
    return this.$collection.find<UserServer>();
  }

  findOne(): Observable<UserServer> {
    return this.$collection.findOne<UserServer>();
  }
}
