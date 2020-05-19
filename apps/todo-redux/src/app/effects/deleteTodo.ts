import { collection } from '@reative/core';
import { getState } from '@reative/state';
import { Todo } from '../interfaces/todo';

export function deleteTodo(todo: Todo) {
  return collection(`Todo`)
    .driver(getState('control.driver'))
    .doc(todo.doc_id)
    .delete();
}
