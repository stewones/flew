import produce from 'immer';

/**
 * Helper for creating redux reducers
 *
 * @export
 * @template T
 * @param {T} init
 * @param {*} tree
 * @returns {fn}
 * @example
 *
 * import { createReducer } from '@flew/state';
 *
 * const person = createReducer<{
 *   firstName: string;
 *   lastName: string;
 * }>(
 *   // initial state
 *   {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *   },
 *   // actions
 *   {
 *    setFirstName: (state, action) => {
 *         state.firstName = action.payload;
 *     },
 *     setLastName: (state, action) => {
 *         state.lastName = action.payload;
 *     },
 *     resetPerson: (state, action) => {
 *         state.firstName = null;
 *         state.lastName = null;
 *     },
 *   }
 * );
 */
export function createReducer<T = any>(init: T, tree) {
  return function (state: T = init, action: { type: string; payload: any }) {
    if (tree[action.type]) {
      return produce(state, draft => {
        if (typeof state === 'object') {
          return void tree[action.type](draft, action);
        }
        return tree[action.type](draft, action);
      });
    }
    return state;
  };
}
