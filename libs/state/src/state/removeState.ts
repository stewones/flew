import { Reative } from '@reative/core';
import { dispatch } from '../store/dispatch';

/**
 * Remove memoized/cached state based on key
 *
 * @export
 * @param {string} key
 * @param {{ cache: boolean }} [options={ cache: true }]
 * @returns {Promise<boolean>}
 */
export function removeState(
  key: string,
  options: { cache: boolean } = { cache: true }
): Promise<boolean> {
  dispatch({
    type: 'MEMO_REMOVE',
    key: key
  });
  if (options.cache) {
    return Reative.storage.remove(key);
  }
  return Promise.resolve(true);
}
