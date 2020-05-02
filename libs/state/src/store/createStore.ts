import { Reative } from '@reative/core';
import { combineReducers, createStore as createReduxStore } from 'redux';

export function createStore(reducers, initialState?) {
  Reative.store.instance = createReduxStore(
    combineReducers(reducers),
    initialState
  );
}
