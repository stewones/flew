import { Injectable } from '@angular/core';
import { Collection, ReactiveRecord } from '@firetask/reactive-record';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '@firetask/reactive-record';

// import { AxiosRequestConfig } from 'axios';

export interface UserEntry extends Response {
  id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: 'user',
  endpoint: '/the-endpoint'
})
export class UserService {
  $collection: ReactiveRecord;

  constructor() {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }

  find(): Observable<UserEntry> {
    return this.$collection.find();
  }

  findOne(): Observable<UserEntry> {
    return this.$collection.findOne();
  }

  findOneAlternative(): Observable<Response<UserEntry>> {
    return this.$collection.findOne();
  }

  findAll(): Observable<Response<UserEntry[]>> {
    return this.$collection.find();
  }
}
