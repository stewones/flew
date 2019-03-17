import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { AxiosRequestConfig } from 'axios';

export interface Album extends Response<Album> {
  id: number;
  userId: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: 'albums',
  endpoint: '/albums'
})
export class AlbumService {
  $collection: ReactiveRecord;

  constructor() {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }

  find(): Observable<Album> {
    return this.$collection.find<Album>();
  }

  findOne(): Observable<Album> {
    return this.$collection.findOne<Album>();
  }
}
