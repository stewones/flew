import { getState } from '@flew/state';

export function findTodosKey(): string {
  return `findTodos/from:${getState('control.from')}`;
}
