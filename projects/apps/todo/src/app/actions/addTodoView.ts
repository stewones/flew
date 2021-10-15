import { Todo } from '../interfaces/todo';
import { createAction } from '@rebased/state';

export const addTodoView = createAction<Todo>('addTodoView');
