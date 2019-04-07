import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response,
  Log
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PlayState } from '../+play/play.reducer';
import { AddCollectionLog } from '../+play/collection/collection.actions';
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

  constructor(private store: Store<PlayState>) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddCollectionLog(log));
    });
  }

  find(): Observable<Photo> {
    return this.$collection.find<Photo>();
  }

  findOne(): Observable<Photo> {
    return this.$collection.findOne<Photo>();
  }
}
