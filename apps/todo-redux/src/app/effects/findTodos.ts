import { collection } from '@reative/core';
import { map } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';

export function findTodos(options: TodoFindOptions) {
  return collection(`Todo`, { pathname: options.pathname })
    .driver(options.driver)
    .memo(options.useMemo)
    .cache(options.useCache)
    .network(options.useNetwork)
    .find<Todo[]>()
    .pipe(
      map((response: any[]) => {
        if (options.driver === 'http') {
          response = response.map(it => {
            return {
              id: it.id,
              text: `kitty #${it.id} <img src="${it.url}" height="48" />`
            };
          });
        }
        return response;
      })
    );
}
