import { fetch } from '@flew/network';
import { getState } from '@flew/state';
import { Todo } from '../interfaces/todo';

export function setTodo(todo: Todo) {
  return fetch(`Todo`).from(getState('control.from')).set(todo);
}
