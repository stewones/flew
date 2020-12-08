import { Rebased } from '@rebased/core';
import { dispatch } from '../store/dispatch';

export interface SetStateOptions {
  saveCache?: boolean;
}

export function setState(
  key: string,
  value: any,
  options: SetStateOptions = { saveCache: true }
) {
  dispatch({
    type: 'stateUpdate',
    key: key,
    value: value
  });

  if (Rebased.storage && options.saveCache) {
    try {
      Rebased.storage.set(key, value);
    } catch (err) {}
  }
}
