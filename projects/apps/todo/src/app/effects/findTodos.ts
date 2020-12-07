import { fetch } from '@rebased/core';
import { map } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';
import { findTodosKey } from './findTodosKey';

export function findTodos(options: TodoFindOptions) {
  return fetch(`Todo`, { pathname: options.pathname })
    .key(findTodosKey())
    .driver(options.driver)
    .state(options.useState)
    .cache(options.useCache)
    .network(options.useNetwork)
    .find<Todo[]>()
    .pipe(
      map((response: any[]) => {
        if (options.driver === 'http') {
          response = response.map(it => {
            return {
              doc_id: it.id,
              text: `kitty #${it.id} <img src="${it.url}" height="48" />`
            };
          });
        }
        return response;
      })
    );
}
