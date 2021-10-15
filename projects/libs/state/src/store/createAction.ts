/**
 * Helper for creating redux actions
 *
 * @export
 * @template T
 * @param {string} type
 * @returns {fn}
 *
 * @example
 *
 * import { createAction, dispatch } from '@rebased/state';
 *
 * // create action
 * const increment = createAction<number>('increment');
 *
 * // dispatch
 * dispatch(increment(54))
 */
export function createAction<T = any>(
  type: string
): (
  payload?: Partial<T>,
  ...args
) => { type: string; payload?: Partial<T>; [key: string]: any } {
  return (payload, ...args) => {
    let meta = {
      type: type,
      payload: payload
    };

    for (const k in args) {
      meta = {
        ...meta,
        ...args[k]
      };
    }

    return meta;
  };
}
