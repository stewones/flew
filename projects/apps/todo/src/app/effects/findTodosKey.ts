import { getState } from '@rebased/state';

export function findTodosKey(): string {
  return `findTodos/driver:${getState('control.driver')}`;
}
