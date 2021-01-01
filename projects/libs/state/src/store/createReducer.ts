import produce from 'immer';
export function createReducer<T = any>(init: T, tree) {
  return function(state: T = init, action: { type: string; payload: any }) {
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
