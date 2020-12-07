import { Observable } from 'rxjs';
import { store } from './store';
import { get, cloneDeep } from 'lodash';

import watch from 'redux-watch';

export interface ConnectOptions {
  context: boolean;
  mutable: boolean;
  state: boolean;
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
    mutable: false,
    state: false
  }
): Observable<T> {
  if (options.state) {
    path = `_state.${path}`;
  }
  return new Observable(observer => {
    const storeInstance = store();
    const storeValue = options.mutable
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
        const nextValue = options.mutable ? cloneDeep(next) : next;
        if (options.context) {
          observer.next({
            path,
            prev,
            next: nextValue
          } as any);
        } else {
          observer.next(nextValue);
        }
      })
    );
  });
}
