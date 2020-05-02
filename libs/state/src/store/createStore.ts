import { Reative } from '@reative/core';
import { combineReducers, createStore as createReduxStore } from 'redux';
import { pickBy, isEmpty } from 'lodash';

// rr reducer
function _cache_(state = {}, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, ...action.payload };
    case 'REMOVE':
      return { ...pickBy(state, it => it.key !== action.key) };
    case 'RESET':
      return {};
    default:
      return state;
  }
}

export function createStore(reducers, enhancers?);
export function createStore(reducers, initialState?, enhancers?);
export function createStore(reducers, initialState?, enhancers?) {
  if (!isEmpty(Reative.store)) {
    console.warn(`oops looks like there's a store created already`);
  }

  return (Reative.store = createReduxStore(
    combineReducers({ _cache_, ...reducers }),
    initialState,
    enhancers
  ));
}
