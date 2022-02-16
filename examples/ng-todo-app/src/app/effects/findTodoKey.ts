import { getState } from '@flew/state';

export function findTodoKey(id: string): string {
  return `findTodo/id:${id}/driver:${getState('control.from')}`;
}
