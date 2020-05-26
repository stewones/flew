import { getState } from '@reative/state';

export function findTodosKey(): string {
  return `findTodos/driver:${getState('control.driver')}`;
}
