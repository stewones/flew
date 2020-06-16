---
id: verbs
title: Verbs
description: 'Set of verb methods for Rebased calls'
hide_title: false
---

We call verb the final method from a given [collection](/core/collection) call.

## Example

```js
import { collection } from '@rebased/core';

collection('kitty', {
  silent: false,
  driver: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  // verb
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(kitty => console.log(kitty));
```


## Availability
|                                  | http                   | firebase                | firestore              | parse                    |
| -------------------------------- | ---------------------- | ----------------------- | ---------------------- | ------------------------ |
| <a href="/core/api/">find</a>    | ⚙<sub>http.get</sub>   | ✅                       | ✅                      | ✅                        |
| <a href="/core/api/">findOne</a> | ⚙<sub>http.get</sub>   | ✅                       | ✅                      | ✅                        |
| <a href="/core/api/">on</a>      | ⛔️                     | ✅                       | ✅                      | ✅                        |
| <a href="/core/api/">get</a>     | ✅                      | ⚙<sub>http.get</sub>    | ⚙<sub>http.get</sub>   | ⚙<sub>parse.find</sub>   |
| <a href="/core/api/">post</a>    | ✅                      | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>  | ⚙<sub>parse.find</sub>   |
| <a href="/core/api/">update</a>  | ⚙<sub>http.patch</sub> | ⚙<sub>http.patch</sub>  | ✅                      | ⚙<sub>parse.update</sub> |
| <a href="/core/api/">patch</a>   | ✅                      | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub> | ⚙<sub>parse.set</sub>    |
| <a href="/core/api/">delete</a>  | ✅                      | ⚙<sub>http.delete</sub> | ✅                      | ✅                        |
| <a href="/core/api/">set</a>     | ⚙<sub>http.post</sub>  | ⚙<sub>http.post</sub>   | ✅                      | ✅                        |
| <a href="/core/api/">count</a>   | ⛔️                     | ⛔️                      | ⛔️                     | ✅                        |
| <a href="/core/api/">run</a>     | ⛔️                     | ⛔️                      | ⛔️                     | ✅                        |


✅ available ⛔️ unavailable ⚙ routed