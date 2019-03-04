import { Injectable } from '@angular/core';
import { Collection, ReactiveRecord } from '@firetask/reactive-record';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

export interface TodoEntry extends Observable<TodoEntry> {
  id: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  ...environment.rr,
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

  findAll(): Observable<TodoEntry> {
    return <TodoEntry>this.$collection.find();
  }

  findOne(): Observable<TodoEntry> {
    return <TodoEntry>this.$collection.get('/images/search');
  }
}
