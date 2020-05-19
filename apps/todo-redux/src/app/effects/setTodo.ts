import { collection } from '@reative/core';
import { getState } from '@reative/state';
import { Todo } from '../interfaces/todo';

export function setTodo(todo: Todo) {
  return collection(`Todo`)
    .driver(getState('control.driver'))
    .set(todo);
}
