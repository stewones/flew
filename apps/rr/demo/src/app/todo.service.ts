import { Injectable } from '@angular/core';
import {
  Collection,
  ReactiveRecord,
  Response
} from '@firetask/reactive-record';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

export interface TodoEntry extends Response {
  id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  // useCache: false,
  name: 'todos',
  endpoint: '/v1'
})
export class TodoService {
  $collection: ReactiveRecord; // now RR instance lives here

  constructor() {
    this.$collection.setHook('http.pre', (config: AxiosRequestConfig) => {
      config.headers['Authorization'] = `Bearer the-token`;
    });
    console.log(this);
  }

  findAll(): Observable<Response<TodoEntry>> {
    return this.$collection.find<TodoEntry>();
  }

  findAll_(): Observable<Response<TodoEntry[]>> {
    return this.$collection
      .transformNetwork((r: Response) => r.data)
      .get<Response<TodoEntry[]>>('/images/search');
  }

  findOne(): Observable<TodoEntry> {
    return this.$collection
      .transformNetwork((r: Response) => r.data)
      .get<TodoEntry>('/images/search');
  }

  findOneLegacy(): Observable<TodoEntry> {
    return <any>(
      this.$collection.transformNetwork(r => r.data).get('/images/search')
    );
  }

  findOneSimple(): Observable<TodoEntry> {
    return this.$collection
      .transformNetwork((r: Response) => r.data)
      .get('/images/search');
  }
}
