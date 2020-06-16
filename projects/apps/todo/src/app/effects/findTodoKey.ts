import { getState } from '@rebased/state';

export function findTodoKey(id: string): string {
  return `findTodo/id:${id}/driver:${getState('control.driver')}`;
}
