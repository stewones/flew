import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { AxiosRequestConfig } from 'axios';

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
  ...environment.rr,
  name: 'comments',
  endpoint: '/comments'
})
export class CommentService {
  $collection: ReactiveRecord;

  constructor() {
    // this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }

  find(): Observable<Comment> {
    return this.$collection.find<Comment>();
  }

  findOne(): Observable<Comment> {
    return this.$collection.findOne<Comment>();
  }
}
