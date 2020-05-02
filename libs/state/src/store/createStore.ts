import { Reative } from '@reative/core';
import { combineReducers, createStore as createReduxStore } from 'redux';

export function createStore(reducers, enhancers?);
export function createStore(reducers, initialState?, enhancers?);
export function createStore(reducers, initialState?, enhancers?) {
  Reative.store.instance = createReduxStore(
    combineReducers(reducers),
    initialState,
    enhancers
  );
}
