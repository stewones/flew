---
id: create-store
title: Create Store
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: true
---

# Create Store

Rebased also offers an api to easily create custom enhanced stores

```ts
import { applyMiddleware, compose } from 'redux';
import {
  store,
  createStore,
  createReducer,
  applyDevTools,
  dispatch
} from '@rebased/state';

// create a counter reducer
export const counter = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
});

// create a logger middleware
const logger = store => next => action => {
  console.log('action dispatch', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// create the store
createStore(
  // list of reducers
  { counter },
  // initial state
  { counter: 410 },
  // composing enhancers
  compose(applyDevTools({ production: false }), applyMiddleware(logger))
);

// log initial state from store
console.log('initial store state', store().getState());

// dispatch next state
dispatch({
  type: 'increment',
  payload: 10
});
```

> See more at [example source](https://github.com/rebasedjs/examples/blob/master/store/src/index.ts)
