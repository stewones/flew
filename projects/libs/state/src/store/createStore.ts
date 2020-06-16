import { Rebased } from '@rebased/core';
import { combineReducers, createStore as createReduxStore } from 'redux';
import { pickBy, isEmpty } from 'lodash';
import { install } from '../state/install';

/**
 * Memo reducer from collection responses
 *
 * @param {*} [state={}]
 * @param {*} action
 */
function _memo(state = {}, action) {
  switch (action.type) {
    case 'MEMO_UPDATE':
      return { ...state, [action.key]: action.value };
    case 'MEMO_REMOVE':
      return {
        ...pickBy(state, (it, key) => {
          return key !== action.key;
        })
      };
    case 'MEMO_RESET':
      return {};
    default:
      return state;
  }
}

/**
 * Create a rebased redux store
 * @example
 * import {
 *   createStore,
 *   createReducer,
 *   applyDevTools,
 *   applyMiddleware
 * } from '@rebased/state';
 *
 * export const counter = createReducer(0, {
 *   increment: (state, action) => state + action.payload,
 *   decrement: (state, action) => state - action.payload
 * });
 *
 *  // logger middleware example
 *  const logger = store => next => action => {
 *    console.log('dispatching', action);
 *    const result = next(action);
 *    console.log('next state', store.getState());
 *    return result;
 *  };
 *
 *  createStore(
 *    // list of reducers
 *    { counter },
 *    // initial state
 *    { counter: 420 },
 *    // composing enhancers
 *    compose(applyDevTools({ production: false }), applyMiddleware(logger))
 *  );
 *
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
  if (!isEmpty(Rebased.store)) {
    console.warn(`oops looks like there's a store created already`);
  }
  install();
  return (Rebased.store = createReduxStore(
    combineReducers({ _memo, ...reducers }),
    initialState,
    enhancers
  ));
}
