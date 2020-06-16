---
id: getting-started
title: Getting Started
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: true
---

# Getting Started

Easy as cake, start working with redux today.

### Installation

```bash
$ npm install --save @rebased/state
```

### Create Store

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="vanilla"
values={[
{label: 'Vanilla', value: 'vanilla'},
{label: 'Angular', value: 'angular'}
]}>
<TabItem value="vanilla">

```ts
import {
  createStore,
  createReducer,
  applyDevTools,
  applyMiddleware
} from '@rebased/state';

// counter reducer
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

</TabItem>

<TabItem value="angular">

```ts
// app.module.ts
import { StateModule } from '@rebased/state';
import { environment } from '../environments/environment';

@NgModule({
  // ...
  imports: [
    // ...
    StateModule.forRoot({
      // enable devtools when production is false https://bit.ly/2ACP7QY
      production: environment.production,
      // devtools option https://bit.ly/3fu7vKU
      trace: true,
      // define an initial state
      state: {},
      // pass in custom reducers
      reducers: {}
    })
  ]
})
export class AppModule {}
```

</TabItem>

</Tabs>
