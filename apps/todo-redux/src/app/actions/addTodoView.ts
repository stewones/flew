import { Todo } from '../interfaces/todo';
import { createAction } from '@reative/state';

export const addTodoView = createAction<Todo>('addTodoView');
