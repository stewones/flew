import produce from 'immer';
export function createReducer<T = any>(init: T, tree) {
  return function(state: T = init, action: { type: string; payload: any }) {
    if (tree[action.type]) {
      return produce(state, draft => tree[action.type](draft, action));
    }
    return state;
  };
}
