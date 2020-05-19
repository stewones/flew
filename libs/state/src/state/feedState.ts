import { isFunction, isEmpty } from 'lodash';
import { Reative } from '@reative/core';
import { dispatch } from '../store/dispatch';

/**
 * Transfer state from cache to memory based on a path
 *
 * @export
 * @param {string} [path]
 * @returns
 */
export async function feedState(key?: string) {
  const hasStorage = isFunction(Reative.storage.forEach);

  if (hasStorage) {
    if (key) {
      const cache = await Reative.storage.get(key);
      if (!isEmpty(cache)) {
        dispatch({
          type: 'MEMO_UPDATE',
          key: key,
          value: cache
        });
      }
    } else {
      Reative.storage.forEach((value, k, index) => {
        dispatch({
          type: 'MEMO_UPDATE',
          key: k,
          value: value
        });
      });
    }
  }
  throw new Error(`Can't locate storage instance`);
}
