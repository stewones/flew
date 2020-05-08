import { SetStateOptions, defaultStateOptions } from './state';
import { store } from '../store/store';
import { dispatch } from '../store/dispatch';
import { Reative } from '@reative/core';

export function setState(
  key: string,
  value: any,
  options: SetStateOptions = { save: true }
) {
  options = { ...defaultStateOptions, ...options };
  const currentState = store().getState()['_memo'];
  const nextState = { ...currentState, [key]: value };

  dispatch({
    type: 'MEMO_UPDATE',
    key: key,
    value: value
  });

  if (Reative.storage && options.save) {
    try {
      Reative.storage.set(key, nextState);
    } catch (err) {}
  }
}
