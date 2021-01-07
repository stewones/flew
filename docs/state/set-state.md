---
id: set-state
title: Set State
description: 'Great resources to get started learning and using Rebased with Redux State'
hide_title: false
---

Arbitrary way to persist some state into store.

```ts
import { getState, setState } from '@rebased/state';

console.log(getState());
// { _state: {} }

setState('hello', { world: 2021 });

console.log(getState());
// { _state: { hello: { world: 2021 } } }
```

:::caution
Use with caution, the most organized and scalable way to modify state is dispatching actions through custom reducers.
:::

## Disable cache

By default Rebased detects if you're using the cache package and will also **auto save** data into storage.

```ts
import { setState } from '@rebased/state';

setState('numbers', [1, 2, 3], { save: false }); // skip cache
```
