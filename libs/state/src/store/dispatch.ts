import { Reative } from '@reative/core';

export function dispatch(action: { type: string; [key: string]: any }) {
  return Reative.store.instance.dispatch(action);
}
