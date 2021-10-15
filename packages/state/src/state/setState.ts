import { namespace } from '@flew/core';
import { dispatch } from '../store/dispatch';

const workspace = namespace();

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
  options: SetStateOptions = { cache: true },
) {
  dispatch({
    type: 'fetchStateUpdate',
    key: key,
    value: value,
  });

  if (workspace.storage && options.cache) {
    try {
      workspace.storage.set(key, value);
    } catch (err) {}
  }
}
