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
export async function feedState(path?: string) {
  const hasStorage = isFunction(Reative.storage.forEach);

  if (hasStorage) {
    if (path) {
      const cache = await Reative.storage.get(`_memo.${path}`);
      if (!isEmpty(cache)) {
        dispatch({
          type: 'MEMO_UPDATE',
          path: path,
          payload: cache
        });
      }
    } else {
      Reative.storage.forEach((value, k, index) => {
        dispatch({
          type: 'MEMO_UPDATE',
          path: `_memo.${k}`,
          payload: value
        });
      });
    }
  }
  throw new Error(`Can't locate storage instance`);
}
