import { Todo } from '../interfaces/todo';
import { createAction } from '@rebased/state';

export const addTodoList = createAction<Todo[]>('addTodoList');
