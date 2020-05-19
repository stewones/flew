import { getState } from '@reative/state';

export function findTodosKey(): string {
  return `findTodos/driver:${getState('control.driver')}/memo:${getState(
    'control.useMemo'
  )}/cache:${getState('control.useCache')}/network:${getState(
    'control.useNetwork'
  )}`;
}
