import { collection } from '@reative/core';
import { Todo } from '../interfaces/todo';

export function findTodos() {
  return collection(`Todo`)
    .driver(`firestore`)
    .find<Todo[]>();
}
