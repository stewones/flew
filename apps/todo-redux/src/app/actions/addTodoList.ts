import { Todo } from '../interfaces/todo';
import { createAction } from '@reative/state';

export const addTodoList = createAction<Todo[]>('addTodoList');
