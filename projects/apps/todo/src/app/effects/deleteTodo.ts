import { fetch } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function deleteTodo(todo: Todo) {
  return fetch(`Todo`)
    .driver(getState('control.driver'))
    .doc(todo.doc_id)
    .delete();
}
