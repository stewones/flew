import { SetStateOptions } from './state';
import { dispatch } from '../store/dispatch';
import { Reative } from '@reative/core';

export function setMemo(
  key: string,
  value: any,
  options: SetStateOptions = { save: true }
) {
  dispatch({
    type: 'MEMO_UPDATE',
    key: key,
    value: value
  });

  if (Reative.storage && options.save) {
    try {
      Reative.storage.set(key, value);
    } catch (err) {}
  }
}
