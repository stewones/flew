import { Todo } from '../interfaces/todo';

export function addTodoView(todo: Partial<Todo>) {
  return {
    type: 'ADD_TODO_VIEW',
    payload: todo
  };
}
