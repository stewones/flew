---
id: chain
title: Chaining
description: 'Set of operations for Rebased calls'
hide_title: false
---

We call chaining api the set of operations we can do on a single call, combining queries and controlling results from state, cache and network.

## Example

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  driver: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('random-kitty') // chain
  .cache(false) // chain
  .state(false) // chain
  .get('/images/search?size=small') // get is the verb
  .subscribe(kitty => console.log(kitty));
```

## Availability

|                                          | http | firebase | firestore | parse |
| ---------------------------------------- | ---- | -------- | --------- | ----- |
| <a href="/core/api">driver</a>           | ✅   | ✅       | ✅        | ✅    |
| <a href="/core/api">network</a>          | ✅   | ✅       | ✅        | ✅    |
| <a href="/core/api">key</a>              | ✅   | ✅       | ✅        | ✅    |
| <a href="/core/api">query</a>            | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">where</a>            | ⛔️  | ✅       | ✅        | ✅    |
| <a href="/core/api">sort</a>             | ⛔️  | ⛔️      | ✅        | ✅    |
| <a href="/core/api">size</a>             | ⛔️  | ⛔️      | ✅        | ✅    |
| <a href="/core/api">at</a>               | ⛔️  | ⛔️      | ✅        | ⛔️   |
| <a href="/core/api">after</a>            | ⛔️  | ⛔️      | ✅        | ✅    |
| <a href="/core/api">ref</a>              | ⛔️  | ✅       | ⛔️       | ⛔️   |
| <a href="/core/api">http</a>             | ✅   | ⛔️      | ⛔️       | ⛔️   |
| <a href="/core/api">include</a>          | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">doc</a>              | ⛔️  | ⛔️      | ✅        | ✅    |
| <a href="/core/api">master</a>           | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">token</a>            | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">object</a>           | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">cache</a>            | ⚙    | ⚙        | ⚙         | ⚙     |
| <a href="/core/api">select</a>           | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">state</a>            | ✅   | ✅       | ✅        | ✅    |
| <a href="/core/api">near</a>             | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">withinKilometers</a> | ⛔️  | ⛔️      | ⛔️       | ✅    |
| <a href="/core/api">withinMiles</a>      | ⛔️  | ⛔️      | ⛔️       | ✅    |

✅ available ⛔️ unavailable ⚙ only in browser
