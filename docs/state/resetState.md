---
id: resetState
title: Reset State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: false
---

Clean the whole fetch state

## Example

```ts
import { getState, resetState } from '@rebased/state';

console.log(getState());
// { _fetch: { name: 'John', age: 34 }}

resetState();

console.log(getState());
// { _fetch: {}}
```
