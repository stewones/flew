import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response,
  Log
} from '@reactive/records';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddLog } from '../+state/log/log.actions';

export interface Album extends Response<Album> {
  id: number;
  userId: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'albums',
  endpoint: '/albums'
})
export class AlbumService {
  $collection: ReactiveRecord;

  constructor(private store: Store) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddLog(log));
    });
  }

  find(): Observable<Album> {
    return this.$collection.find<Album>();
  }

  findOne(): Observable<Album> {
    return this.$collection.findOne<Album>();
  }
}
