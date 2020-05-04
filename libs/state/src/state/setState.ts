import { SetStateOptions, defaultStateOptions } from './state';
import { store } from '../store/store';
import { dispatch } from '../store/dispatch';
import { Reative } from '@reative/core';

export function setState(
  path: string,
  value: any,
  options: SetStateOptions = { save: true }
) {
  options = { ...defaultStateOptions, ...options };
  const currentState = store().getState();
  const nextState = { ...currentState, [path]: value };

  dispatch({
    type: 'MEMO_UPDATE',
    path: path,
    payload: value
  });

  if (Reative.storage && options.save) {
    try {
      Reative.storage.set(path, nextState);
    } catch (err) {}
  }
}
