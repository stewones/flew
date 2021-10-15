import { namespace } from '@flew/core';
import { combineReducers, createStore as createReduxStore } from 'redux';
import { pickBy, isEmpty } from 'lodash';

const workspace = namespace();

// the fetch reducer
function _fetch(state = {}, action) {
  switch (action.type) {
    case 'fetchStateUpdate':
      return { ...state, [action.key]: action.value };
    case 'fetchStateRemove':
      return {
        ...pickBy(state, (it, key) => {
          return key !== action.key;
        }),
      };
    case 'fetchStateReset':
      return {};
    default:
      return state;
  }
}

/**
 * Create custom redux store
 * @example
 * import {
 *   createStore,
 *   createReducer,
 *   applyDevTools,
 *   applyMiddleware
 * } from '@flew/state';
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
  if (!isEmpty(workspace.store)) {
    console.warn(`oops looks like there's a store created already`);
  }

  return (workspace.store = createReduxStore(
    combineReducers({ _fetch, ...reducers }),
    initialState,
    enhancers,
  ));
}

/**
 * Retrieve Flew store instance
 *
 * @export
 * @returns {FlewStore}
 */
export function store() {
  return workspace.store;
}
