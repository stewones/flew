import { Observable } from 'rxjs';
import { store } from './store';
import { get } from 'lodash';

import watch from 'redux-watch';

export interface ConnectOptions {
  context: boolean;
  fetch: boolean;
}

export interface StateContext<T = any> {
  path: string;
  prev: T;
  next: T;
}

export function connect<T>(
  path: string,
  options: Partial<ConnectOptions> = {
    context: false,
    fetch: false
  }
): Observable<T> {
  if (options.fetch) {
    path = `_fetch.${path}`;
  }

  return new Observable(observer => {
    const storeInstance = store();
    const storeValue = get(storeInstance.getState(), path);

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

        if (options.context) {
          observer.next({
            path,
            prev,
            next
          } as any);
        } else {
          observer.next(next);
        }
      })
    );
  });
}
