import { Rebased } from '@rebased/core';
import { dispatch } from '../store/dispatch';

export interface SetMemoOptions {
  cacheSave?: boolean;
}

export function setMemo(
  key: string,
  value: any,
  options: SetMemoOptions = { cacheSave: true }
) {
  dispatch({
    type: 'MEMO_UPDATE',
    key: key,
    value: value
  });

  if (Rebased.storage && options.cacheSave) {
    try {
      Rebased.storage.set(key, value);
    } catch (err) {}
  }
}
