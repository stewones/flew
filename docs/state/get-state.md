---
id: get-state
title: Get State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: true
---

# Get State

Provides programmatically access to a piece of content whether you've made a fetch call, set a piece of state arbitrary or just dispatched an action.

```ts
import { getState } from '@rebased/state';

console.log(getState());
// { inner: { counter: { value: 1 } }, _fetch: { hello: 'there' }}

console.log(getState('inner.counter.value'));
// 1

console.log(getState('hello'));
// 'there'
```

:::info
Responses from `fetch` and `setState` lives under the `_fetch` reducer
:::
