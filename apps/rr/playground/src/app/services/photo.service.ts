import { Injectable } from '@angular/core';
import {
  Collection,
  Records,
  Response,
  Log
} from '@reactive/records';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddLog } from '../+state/log/log.actions';

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
  name: 'photos',
  endpoint: '/photos'
})
export class PhotoService {
  $collection: Records;

  constructor(private store: Store) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddLog(log));
    });
  }

  find(): Observable<Photo> {
    return this.$collection.find<Photo>();
  }

  findOne(): Observable<Photo> {
    return this.$collection.findOne<Photo>();
  }
}
