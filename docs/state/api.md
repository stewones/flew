---
id: api
title: API
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: true
---

# State API

<a name="getState"></a>

## getState(path) ⇒ <code>T</code>

<p>Grab a piece of data from state synchronously</p>

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| path  | <code>string</code> |

<a name="install"></a>

## install()

<p>Initiate state stuff on Rebased</p>

**Kind**: global function  
<a name="resetState"></a>

## resetState()

<p>Fully reset current state</p>

**Kind**: global function  
<a name="unsetMemo"></a>

## unsetMemo(key, [options]) ⇒ <code>Promise.&lt;void&gt;</code>

<p>Remove memoized/cached state based on a key</p>

**Kind**: global function

| Param     | Type                | Default                      |
| --------- | ------------------- | ---------------------------- |
| key       | <code>string</code> |                              |
| [options] | <code>Object</code> | <code>{ cache: true }</code> |

<a name="_state"></a>

## \_state([state], action)

<p>Memo reducer from fetch responses</p>

**Kind**: global function

| Param   | Type            | Default         |
| ------- | --------------- | --------------- |
| [state] | <code>\*</code> | <code>{}</code> |
| action  | <code>\*</code> |                 |

<a name="createStore"></a>

## createStore(reducers, initialState, [enhancers])

<p>Create a rebased redux store</p>

**Kind**: global function

| Param        | Type            |
| ------------ | --------------- |
| reducers     | <code>\*</code> |
| initialState | <code>\*</code> |
| [enhancers]  | <code>\*</code> |

**Example**

```js
import {
  createStore,
  createReducer,
  applyDevTools,
  applyMiddleware
} from '@rebased/state';

export const counter = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
});

// logger middleware example
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

createStore(
  // list of reducers
  { counter },
  // initial state
  { counter: 420 },
  // composing enhancers
  compose(applyDevTools({ production: false }), applyMiddleware(logger))
);

store().subscribe(it => console.log(it, store().getState()));
```
