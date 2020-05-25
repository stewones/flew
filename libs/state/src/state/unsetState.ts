import { dispatch } from '../store/dispatch';
import { Reative } from '@reative/core';

/**
 * Remove memoized/cached state based on a key
 *
 * @export
 * @param {string} key
 * @param {{ cache: boolean }} [options={ cache: true }]
 * @returns
 */
export function unsetState(
  key: string,
  options: { cache: boolean } = { cache: true }
) {
  dispatch({
    type: 'MEMO_REMOVE',
    key: key
  });
  if (options.cache) {
    return Reative.storage.remove(key);
  }
  return Promise.resolve(true);
}
