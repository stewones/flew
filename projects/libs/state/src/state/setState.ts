import { Rebased } from '@rebased/core';
import { dispatch } from '../store/dispatch';

export interface SetStateOptions {
  cache?: boolean;
}

/**
 * Arbitrary way to set fetch state
 *
 * @export
 * @param {string} key
 * @param {*} value
 * @param {SetStateOptions} [options={ cache: true }]
 */
export function setState(
  key: string,
  value: any,
  options: SetStateOptions = { cache: true }
) {
  dispatch({
    type: 'fetchStateUpdate',
    key: key,
    value: value
  });

  if (Rebased.storage && options.cache) {
    try {
      Rebased.storage.set(key, value);
    } catch (err) {}
  }
}
