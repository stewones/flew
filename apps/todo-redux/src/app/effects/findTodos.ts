import { collection } from '@reative/core';
import { Todo } from '../interfaces/todo';
import { TodoFindOptions } from '../interfaces/todoFindOptions';

export function findTodos(
  options: TodoFindOptions = { useMemo: true, useCache: true, useNetwork: true }
) {
  return collection(`Todo`)
    .driver(`firestore`)
    .memo(options.useMemo)
    .cache(options.useCache)
    .network(options.useNetwork)
    .find<Todo[]>();
}
