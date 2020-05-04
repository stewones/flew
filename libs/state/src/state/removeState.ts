import { dispatch } from '../store/dispatch';

/**
 * Remove state based on path
 *
 * @export
 * @param {string} path
 */
export function removeState(path: string) {
  dispatch({
    type: 'MEMO_REMOVE',
    path: path
  });
}
