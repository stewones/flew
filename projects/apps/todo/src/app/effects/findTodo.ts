import { fetch } from '@rebased/core';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';
import { findTodoKey } from './findTodoKey';

export function findTodo(id: string, options: TodoFindOptions) {
  return fetch(`Todo`, { pathname: options.pathname })
    .key(findTodoKey(id))
    .driver(options.driver)
    .memo(options.useMemo)
    .cache(options.useCache)
    .network(options.useNetwork)
    .where(`doc_id`, `==`, id)
    .findOne<Todo>();
}
