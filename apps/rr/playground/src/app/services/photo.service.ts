import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { AxiosRequestConfig } from 'axios';

export interface Photo extends Response<Photo> {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: 'photos',
  endpoint: '/photos'
})
export class PhotoService {
  $collection: ReactiveRecord;

  constructor() {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }

  find(): Observable<Photo> {
    return this.$collection.find<Photo>();
  }

  findOne(): Observable<Photo> {
    return this.$collection.findOne<Photo>();
  }
}
