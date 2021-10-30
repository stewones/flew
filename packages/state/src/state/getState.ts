import lodash from 'lodash';
const { get, isUndefined } = lodash;
import { store } from '../store';

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
    data = get(currentState, `_network_.${path}`);
  }
  return path ? (data as T) : (currentState as T);
}
