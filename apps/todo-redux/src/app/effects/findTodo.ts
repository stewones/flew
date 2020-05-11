import { collection } from '@reative/core';
import { map } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';

export function findTodo(id: string, options: TodoFindOptions) {
  return collection(`Todo`, { pathname: options.pathname })
    .driver(options.driver)
    .memo(options.useMemo)
    .cache(options.useCache)
    .network(options.useNetwork)
    .where(`doc_id`, `==`, id)
    .findOne<Todo>();
}
