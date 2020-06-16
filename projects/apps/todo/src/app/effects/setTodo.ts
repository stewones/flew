import { collection } from '@rebased/core';
import { getState } from '@rebased/state';
import { Todo } from '../interfaces/todo';

export function setTodo(todo: Todo) {
  return collection(`Todo`)
    .driver(getState('control.driver'))
    .set(todo);
}
