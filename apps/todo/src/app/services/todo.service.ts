import { Injectable } from '@angular/core';
import { Collection, Records, Guid } from '@reative/records';
import { Observable, of } from 'rxjs';
import { firestore } from '@reative/firebase';
import { getState } from '@reative/state';

export interface Todo {
  createdAt: string;
  id: string;
  text: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
@Collection({
  name: 'todos'
  // endpoint: '/todos'
})
export class TodoService {
  $collection: Records;

  constructor() {
    // this.$collection.http((config: AxiosRequestConfig) => {
    //  config.headers['Authorization'] = `Bearer the-server-token`;
    // });
  }
  // findOne(id: string): Observable<Todo> {
  //   return this.$collection.where(`id`, `==`, id).findOne();
  // }

  find(): Observable<Todo[]> {
    return this.$collection
      .sort({ createdAt: 'desc' })
      .key('todo-list')
      .find();
  }

  save(todo: Todo) {
    if (!todo || !todo.id) throw 'todo object required';
    return this.$collection.doc(todo.id).update(todo);
  }

  create(text: string): Observable<Todo> {
    const todoList = getState(`todo-list`) || [];
    const todo: Todo = {
      createdAt: new Date().toISOString(),
      done: false,
      id: Guid.make(),
      text: text
    };
    this.$collection
      .doc(todo.id)
      .set(todo)
      .toPromise()
      .catch(err => console.log(err));
    return of(todo);
  }

  //
  // for now rr doesn't has an api for deletion
  // but we can import the firestore instance
  remove(id: string): Promise<void> {
    console.log(`removing id`);
    return firestore()
      .collection('todos')
      .doc(id)
      .delete();
  }
}
