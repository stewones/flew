---
id: setup
title: Setup
description: 'Rebased state setup'
hide_title: true
---

# Setup

The Rebased state is built upon [reduxjs](https://github.com/reduxjs/redux) providing the necessary foundation for working with memoized data.

## Install

```sh
npm install @rebased/state @rebased/core
```

## Configure

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="typescript"
values={[
{label: 'Typescript', value: 'typescript'},
{label: 'Angular', value: 'angular'}
]}>

<TabItem value="typescript">

```js
import { install, createReducer } from '@rebased/state';

const counter = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
});

install({
  // enables Redux devTools
  // https://bit.ly/2ACP7QY
  production: false,
  // trace source of state changes
  // more options at https://bit.ly/3fu7vKU
  trace: true,
  // initial state
  state: {
    counter: 420
  },
  reducers: {
    counter
  }
});
```

</TabItem>
<TabItem value="angular">

```ts title="app.module.ts"
import { StateModule } from '@rebased/angular';
import { createReducer } from '@rebased/state';

const counter = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
});

@NgModule({
  // ...
  imports: [
    // ...
    StateModule.forRoot({
      // enables Redux devTools
      // https://bit.ly/2ACP7QY
      production: false,
      // trace source of state changes
      // more options at https://bit.ly/3fu7vKU
      trace: true,
      // initial state
      state: {
        counter: 420
      },
      // pass in custom reducers
      reducers: {
        counter
      }
    })
  ]
})
export class AppModule {}
```

</TabItem>
</Tabs>

## Example

```ts
import { dispatch } from '@rebased/state';

// increment counter by 10
dispatch({
  type: 'increment',
  payload: 10
});
```
