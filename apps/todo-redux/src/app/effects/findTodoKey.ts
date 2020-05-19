import { getState } from '@reative/state';

export function findTodoKey(id: string): string {
  return `findTodo/id:${id}/driver:${getState(
    'control.driver'
  )}/memo:${getState('control.useMemo')}/cache:${getState(
    'control.useCache'
  )}/network:${getState('control.useNetwork')}`;
}
