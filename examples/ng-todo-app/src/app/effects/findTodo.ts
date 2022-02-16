import { fetch } from '@flew/network';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';
import { findTodoKey } from './findTodoKey';

export function findTodo(id: string, options: TodoFindOptions) {
  return fetch(`Todo`, { pathname: options.pathname })
    .key(findTodoKey(id))
    .from(options.from)
    .state(options.useState)
    .cache(options.useCache)
    .network(options.useNetwork)
    .where(`doc_id`, `==`, id)
    .findOne<Todo>();
}
