import { Todo } from '../interfaces/todo';
import { createAction } from '@flew/state';

export const addTodoList = createAction<Todo[]>('addTodoList');
