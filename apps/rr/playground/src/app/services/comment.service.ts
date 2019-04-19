import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response,
  Log
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddLog } from '../+state/log/log.actions';

export interface Comment extends Response<Comment> {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'comments',
  endpoint: '/comments'
})
export class CommentService {
  $collection: ReactiveRecord;

  constructor(private store: Store) {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
    this.$collection.$log.subscribe((log: Log) => {
      this.store.dispatch(new AddLog(log));
    });
  }

  find(): Observable<Comment> {
    return this.$collection.find<Comment>();
  }

  findOne(): Observable<Comment> {
    return this.$collection.findOne<Comment>();
  }
}
