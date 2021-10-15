<a name="select"></a>

## select(key, [raw]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Select data from Reative State</p>
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

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [raw] | <code>boolean</code> | 

<a name="resetState"></a>

## resetState()
<p>Fully reset current state</p>

**Kind**: global function  
<a name="removeState"></a>

## removeState(key)
<p>Reset a specific state based on key</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="getState"></a>

## getState(stateKey, [options]) ⇒ <code>T</code>
<p>Get state synchronously</p>
| path | <code>string</code> | 

<a name="install"></a>

## install()
<p>Bootstrap state stuff for Rebased</p>

**Kind**: global function  
<a name="resetState"></a>

## resetState()
<p>Fully reset current fetch state</p>

**Kind**: global function  
<a name="setState"></a>

## setState(key, value, [options])
<p>Arbitrary way to set fetch state</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| key | <code>string</code> |  | 
| value | <code>\*</code> |  | 
| [options] | <code>SetStateOptions</code> | <code>{ cache: true }</code> | 

<a name="unsetState"></a>

## unsetState(key, [options]) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Remove specific fetch state</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| [options] | <code>GetStateOptions</code> | <code>{ raw: false, mutable: false }</code> | 

<a name="getState$"></a>

## getState$(stateKey, [options]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Get state asynchronously</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| [options] | <code>GetStateOptions</code> | <code>{ raw: false, feed: true }</code> | 

<a name="addState"></a>

## addState(stateKey, value)
<p>Add a new state imperatively</p>
| key | <code>string</code> |  | 
| [options] | <code>Object</code> | <code>{ cache: true }</code> | 

<a name="applyDevTools"></a>

## applyDevTools([options]) ⇒ <code>compose</code>
<p>Apply Redux DevTools
full list of options at
https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| [options] | <code>\*</code> | 

<a name="connect"></a>

## connect(path, [options&#x3D;{
    context: false,
    fetch: false
  }]) ⇒ <code>Observable.&lt;T&gt;</code>
<p>Provides reactive data access through observables</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| stateKey | <code>string</code> | 
| value | <code>\*</code> | 

<a name="setState"></a>

## setState(stateKey, value, [options])
<p>Add a new state dynamically</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| stateKey | <code>string</code> |  | 
| value | <code>\*</code> |  | 
| [options] | <code>SetStateOptions</code> | <code>{ identifier: Reative.options.identifier }</code> | 

<a name="feedState"></a>

## feedState([stateKey])
<p>Transfer state from cache to memory</p>
| path | <code>string</code> | 
| [options={
    context: false,
    fetch: false
  }] | <code>Partial.&lt;ConnectOptions&gt;</code> | 

<a name="createAction"></a>

## createAction(type) ⇒ <code>fn</code>
<p>Helper for creating redux actions</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| type | <code>string</code> | 

**Example**  
```js
import { createAction, dispatch } from '@rebased/state';

// create action
const increment = createAction<number>('increment');

// dispatch
dispatch(increment(54))
```
<a name="createReducer"></a>

## createReducer(init, tree) ⇒ <code>fn</code>
<p>Helper for creating redux reducers</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| [stateKey] | <code>string</code> | 

<a name="install"></a>

## install(instance)
<p>Initiate state stuff on Reative Platform</p>
| init | <code>T</code> | 
| tree | <code>\*</code> | 

**Example**  
```js
import { createReducer } from '@rebased/state';

const person = createReducer<{
  firstName: string;
  lastName: string;
}>(
  // initial state
  {
    firstName: 'John',
    lastName: 'Doe',
  },
  // actions
  {
   setFirstName: (state, action) => {
        state.firstName = action.payload;
    },
    setLastName: (state, action) => {
        state.lastName = action.payload;
    },
    resetPerson: (state, action) => {
        state.firstName = null;
        state.lastName = null;
    },
  }
);
```
<a name="createStore"></a>

## createStore(reducers, initialState, [enhancers])
<p>Create custom redux store</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| reducers | <code>\*</code> | 
| initialState | <code>\*</code> | 
| [enhancers] | <code>\*</code> | 

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
<a name="dispatch"></a>

## dispatch(action) ⇒ <code>any</code>
<p>Action dispatcher</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| instance | <code>\*</code> | 

| action | <code>Action</code> | 

<a name="store"></a>

## store() ⇒ <code>RebasedStore</code>
<p>Retrieve Rebased store instance</p>

**Kind**: global function  
