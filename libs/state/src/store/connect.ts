import { Observable } from 'rxjs';
import { store } from './store';
import { get } from 'lodash';

import watch from 'redux-watch';

export function connect<T>(
  path: string,
  options: { raw: boolean } = { raw: false }
): Observable<T> {
  return new Observable(observer => {
    const storeInstance = store();
    const storeValue = get(storeInstance.getState(), path);

    const w = watch(storeInstance.getState, path);
    if (options.raw) {
      observer.next({
        path,
        pre: null,
        next: storeValue
      } as any);
    } else {
      observer.next(storeValue);
    }

    storeInstance.subscribe(
      w((next, prev, path) => {
        console.log(
          '%s changed from %s to %s at %s',
          path,
          prev,
          next,
          new Date().toLocaleTimeString()
        );
        if (options.raw) {
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

//
// @todo @Connect decorator

export type ConnectType<T> = <U extends Observable<T>, K extends string>(
  target: U,
  key: K
) => void;

export type ComponentClass<T> = {
  [P in keyof T]: T[P];
};

export type PropertyType<T> = T extends (...args: any[]) => any
  ? Observable<ReturnType<T>>
  : any;

export function Connect<T>(
  path: string,
  options: { raw: boolean } = { raw: false }
) {
  return function(constructor: Function) {
    constructor.prototype.display$ = connect<T>(path, options);
  };
}

// export function Connect<T>(
//   path: string,
//   options: { raw: boolean } = { raw: false }
// ): ConnectType<T> {
//   return function<
//     U extends ComponentClass<any> & Record<K, PropertyType<T>>,
//     K extends string
//   >(target: U, key: K): void {
//     const name: string = key.toString();
//     const selectorId = `__${name}__selector`;

//     Object.defineProperties(target, {
//       [selectorId]: {
//         writable: true,
//         enumerable: false,
//         configurable: true
//       },
//       [name]: {
//         enumerable: true,
//         configurable: true,
//         get(): PropertyType<T> {
//           return connect<T>(path, options) as PropertyType<T>;
//         }
//       }
//     });
//   };
// }
