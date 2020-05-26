import produce from 'immer';
export function createReducer(init, tree) {
  return function(state = init, action: { type: string; payload: any }) {
    if (tree[action.type])
      return produce(state, draft => tree[action.type](draft, action));
    return state;
  };
}
