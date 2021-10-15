import { get, isUndefined } from 'lodash';
import { Observable, of, from } from 'rxjs';
import { Reative } from '@reative/core';
import { GetStateOptions } from './state';
import { store } from '../store/store';
import { dispatch } from '../store/dispatch';

/**
 * Grab a piece of data from state synchronously
 *
 * @export
 * @template T
 * @param {string} path
 * @param {GetStateOptions} [options={ raw: false }]
 * @returns {T}
 */
export function getState<T = any>(
  path?: string,
  /**
   * @deprecated
   */
  options: GetStateOptions = { raw: false }
): T {
  const currentState = store().getState();
  // attempt to get current data from a reducer
  let data = get(currentState, path);
  // otherwise attempt to get memoized data
  if (isUndefined(data)) {
    data = get(currentState, `_memo.${path}`);
  }
  return path ? (data as T) : (currentState as T);
}

/**
 * Grab a piece of data from state asynchronously
 *
 * @export
 * @template T
 * @param {string} key
 * @param {GetStateOptions} [options={ raw: false }]
 * @returns {Observable<T>}
 */
export function getState$<T = any>(
  key: string,
  /**
   * @deprecated
   */
  options: GetStateOptions = { raw: false }
): Observable<T> {
  const responseFromState = getState(key) || null;

  return responseFromState
    ? of(responseFromState)
    : (from(
        new Promise((resolve, reject) => {
          Reative.storage
            .get(key)
            .then(responseFromCache => {
              if (responseFromCache) {
                dispatch({
                  type: 'MEMO_UPDATE',
                  key: key,
                  value: responseFromCache
                });
              }
              resolve(responseFromCache);
            })
            .catch(err => reject(err));
        })
      ) as Observable<T>);
}
