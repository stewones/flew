import { Todo } from '../interfaces/todo';
import { createAction } from '@flew/state';

export const addTodoView = createAction<Todo>('addTodoView');
