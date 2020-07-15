---
id: get-state
title: Get State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: true
---

# Get State

Provides direct access to a piece of data wheter you made a [fetch](/core/fetch) call or has dispatched an action.

```ts
import { getState } from '@rebased/state';

console.log(getState());
// { counter: 1, _memo: { hello: 'there', counter: 54 }}

console.log(getState('hello'));
// 'there'

console.log(getState('counter'));
// 1
```

:::info
Whenever a key is provided `getState` will first try to return state from your custom reducers based on a given path. In case of no results it'll then attempt from the internal reducer `_memo`.
:::
