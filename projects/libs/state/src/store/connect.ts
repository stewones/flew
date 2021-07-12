import { Observable } from 'rxjs';
import { cloneDeep, get } from 'lodash';

import watch from 'redux-watch';
import { store } from './createStore';

export interface ConnectOptions {
  context: boolean;
  fetch: boolean;
  readonly: boolean;
}

export interface StateContext<T = any> {
  path: string;
  prev: T;
  next: T;
}

/**
 * Provides reactive data access through observables
 *
 * @export
 * @template T
 * @param {string} path
 * @param {Partial<ConnectOptions>} [options={
 *     context: false,
 *     fetch: false
 *   }]
 * @returns {Observable<T>}
 */
export function connect<T>(
  path: string,
  options: Partial<ConnectOptions> = {
    context: false,
    fetch: false,
    readonly: true
  }
): Observable<T> {
  if (options.fetch) {
    path = `_fetch.${path}`;
  }

  return new Observable(observer => {
    const storeInstance = store();
    const storeValue =
      options.readonly === false
        ? cloneDeep(get(storeInstance.getState(), path))
        : get(storeInstance.getState(), path);

    const w = watch(storeInstance.getState, path);
    if (options.context) {
      observer.next({
        path,
        prev: storeValue,
        next: storeValue
      } as any);
    } else {
      observer.next(storeValue);
    }

    storeInstance.subscribe(
      w((next, prev, path) => {
        // console.log(
        //   '%s changed from %s to %s at %s',
        //   path,
        //   prev,
        //   next,
        //   new Date().toLocaleTimeString()
        // );

        const nextValue = options.readonly === false ? cloneDeep(next) : next;

        if (options.context) {
          observer.next({
            path,
            prev,
            next: nextValue
          } as any);
        } else {
          observer.next(next);
        }
      })
    );
  });
}
