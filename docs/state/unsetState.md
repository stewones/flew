---
id: unsetState
title: Unset State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: false
---

Clean a specific key from fetch state

## Example

```ts
import { getState, unsetState } from '@rebased/state';

console.log(getState());
// { _fetch: { name: 'John', age: 34 }}

unsetState('age');

console.log(getState());
// { _fetch: { name: 'John' }}
```
