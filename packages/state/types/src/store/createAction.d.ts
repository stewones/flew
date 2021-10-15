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
 * import { createAction, dispatch } from '@flew/state';
 *
 * // create action
 * const increment = createAction<number>('increment');
 *
 * // dispatch
 * dispatch(increment(54))
 */
export declare function createAction<T = any>(type: string): (payload?: Partial<T>, ...args: any[]) => {
    type: string;
    payload?: Partial<T>;
    [key: string]: any;
};
