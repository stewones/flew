import { getState } from '@rebased/state';

export function findTodosKey(): string {
  return `findTodos/from:${getState('control.from')}`;
}
