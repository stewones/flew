import { Reative } from '@reative/core';
import { combineReducers, createStore as createReduxStore } from 'redux';
import { pickBy, isEmpty } from 'lodash';
import { install } from '../state/install';

/**
 * Memo reducer from collection responses
 *
 * @param {*} [state={}]
 * @param {*} action
 * @returns
 */
function _memo(state = {}, action) {
  switch (action.type) {
    case 'MEMO_UPDATE':
      return { ...state, [action.path]: action.payload };
    case 'MEMO_REMOVE':
      return {
        _memo: pickBy(state, it => it.key !== action.path),
        ...pickBy(state, it => it.key !== action.path)
      };
    case 'MEMO_RESET':
      return {};
    default:
      return state;
  }
}

/**
 * Create a reative redux store
 * @example
 *  // logger middleware example
 *   const logger = store => next => action => {
 *   console.log('dispatching', action);
 *   const result = next(action);
 *   console.log('next state', store.getState());
 *   return result;
 *  };
 *
 *  // create store outside app.module
 *  createStore(
 *    // list of reducers
 *    { counter },
 *    // initial state
 *    { counter: 420 },
 *    // enhancers
 *    applyDevTools()
 *    // composing enhancers
 *    compose(applyDevTools(), applyMiddleware(logger))
 *  );
 *  store().subscribe(it => console.log(it, store().getState()));
 *
 * @export
 * @param {*} reducers
 * @param {*} initialState
 * @param {*} [enhancers]
 */
export function createStore(reducers, enhancers?);
export function createStore(reducers, initialState?, enhancers?);
export function createStore(reducers, initialState?, enhancers?) {
  if (!isEmpty(Reative.store)) {
    console.warn(`oops looks like there's a store created already`);
  }
  install();
  return (Reative.store = createReduxStore(
    combineReducers({ _memo, ...reducers }),
    initialState,
    enhancers
  ));
}
