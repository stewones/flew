import { fetch } from '@flew/network';
import { getState } from '@flew/state';
import { Todo } from '../interfaces/todo';

export function deleteTodo(todo: Todo) {
  return fetch(`Todo`).from(getState('control.from')).doc(todo.doc_id).delete();
}
