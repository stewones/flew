import { get, isUndefined } from 'lodash';
import { store } from '../store/store';

/**
 * Grab a piece of data from state synchronously
 *
 * @export
 * @template T
 * @param {string} path
 * @returns {T}
 */
export function getState<T = any>(path?: string): T {
  const currentState = store().getState();
  // attempt to get current data from a reducer
  let data = get(currentState, path);
  // otherwise attempt to get memoized data
  if (isUndefined(data)) {
    data = get(currentState, `_fetch.${path}`);
  }
  return path ? (data as T) : (currentState as T);
}
