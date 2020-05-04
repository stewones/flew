import { get } from 'lodash';
import { Observable, of, from } from 'rxjs';
import { shouldTransformResponse, Reative } from '@reative/core';
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
  const data = get(currentState, path) || get(currentState, `memo.${path}`);
  return path ? (data as T) : currentState;
}

/**
 * Grab a piece of data from state asynchronously
 *
 * @export
 * @template T
 * @param {string} path
 * @param {GetStateOptions} [options={ raw: false }]
 * @returns {Observable<T>}
 */
export function getState$<T = any>(
  path: string,
  /**
   * @deprecated
   */
  options: GetStateOptions = { raw: false }
): Observable<T> {
  const responseFromState = getState(path) || null;

  return responseFromState
    ? of(responseFromState)
    : (from(
        new Promise((resolve, reject) => {
          Reative.storage
            .get(path)
            .then(responseFromCache => {
              if (responseFromCache) {
                dispatch({
                  type: 'MEMO_UPDATE',
                  path: path,
                  payload: responseFromCache
                });
              }
              resolve(responseFromCache);
            })
            .catch(err => reject(err));
        })
      ) as Observable<T>);
}
