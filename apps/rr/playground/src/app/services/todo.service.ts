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

export interface Todo extends Response<Todo> {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
  name: 'todos',
  endpoint: '/todos'
})
export class TodoService {
  $collection: ReactiveRecord;

  constructor(private store: Store<PlayState>) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });

    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddCollectionLog(log));
    });
  }

  find(): Observable<Todo> {
    return this.$collection.find<Todo>();
  }

  findOne(): Observable<Todo> {
    return this.$collection.findOne<Todo>();
  }
}
