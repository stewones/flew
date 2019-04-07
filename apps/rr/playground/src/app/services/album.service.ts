import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response,
  Log
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PlayState } from '../+play/play.reducer';
import { Store } from '@ngrx/store';
import { AddCollectionLog } from '../+play/collection/collection.actions';
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

  constructor(private store: Store<PlayState>) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddCollectionLog(log));
    });
  }

  find(): Observable<Album> {
    return this.$collection.find<Album>();
  }

  findOne(): Observable<Album> {
    return this.$collection.findOne<Album>();
  }
}
