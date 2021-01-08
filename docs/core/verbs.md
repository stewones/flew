---
id: verbs
title: Verbs
description: 'Set of verb methods for Rebased calls'
hide_title: false
---

We call verb the final method for a given [chain](/core/chain)

## Example

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  // chain
  .from('http')
  .cache(true)
  .state(false)
  // verb
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(kitty => console.log(kitty));
```











































































































## Verb Availability
|                                                     | http                                                           | firebase                                                        | firestore                                                      | parse                                                            |
| --------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="/core/api#RebasedCore+find">find</a>       | <small className="block-center">🛣️ <br />`http.get`</small>   | <span className="block-center">✅</span>                         | <span className="block-center">✅</span>                        | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+findOne">findOne</a> | <small className="block-center">🛣️ <br />`http.get`</small>   | <span className="block-center">✅</span>                         | <span className="block-center">✅</span>                        | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+on">on</a>           | <span className="block-center">⛔️</span>                       | <span className="block-center">✅</span>                         | <span className="block-center">✅</span>                        | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+get">get</a>         | <span className="block-center">✅</span>                        | <small className="block-center">🛣️ <br />`http.get`</small>    | <small className="block-center">🛣️ <br />`http.get`</small>   | <small className="block-center">🛣️ <br />`parse.find`</small>   |
| <a href="/core/api#RebasedCore+post">post</a>       | <span className="block-center">✅</span>                        | <small className="block-center">🛣️ <br />`http.post`</small>   | <small className="block-center">🛣️ <br />`http.post`</small>  | <small className="block-center">🛣️ <br />`parse.find`</small>   |
| <a href="/core/api#RebasedCore+update">update</a>   | <small className="block-center">🛣️ <br />`http.patch`</small> | <small className="block-center">🛣️ <br />`http.patch`</small>  | <span className="block-center">✅</span>                        | <small className="block-center">🛣️ <br />`parse.update`</small> |
| <a href="/core/api#RebasedCore+patch">patch</a>     | <span className="block-center">✅</span>                        | <small className="block-center">🛣️ <br />`http.patch`</small>  | <small className="block-center">🛣️ <br />`http.patch`</small> | <small className="block-center">🛣️ <br />`parse.set`</small>    |
| <a href="/core/api#RebasedCore+delete">delete</a>   | <span className="block-center">✅</span>                        | <small className="block-center">🛣️ <br />`http.delete`</small> | <span className="block-center">✅</span>                        | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+set">set</a>         | <small className="block-center">🛣️ <br />`http.post`</small>  | <small className="block-center">🛣️ <br />`http.post`</small>   | <span className="block-center">✅</span>                        | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+count">count</a>     | <span className="block-center">⛔️</span>                       | <span className="block-center">⛔️</span>                        | <span className="block-center">⛔️</span>                       | <span className="block-center">✅</span>                          |
| <a href="/core/api#RebasedCore+run">run</a>         | <span className="block-center">⛔️</span>                       | <span className="block-center">⛔️</span>                        | <span className="block-center">⛔️</span>                       | <span className="block-center">✅</span>                          |


<div className="availability">

| symbol                                    | meaning                                              | description                               |
| ----------------------------------------- | ---------------------------------------------------- | ---------------------- ------------------ |
| <span className="block-center">✅ </span> | <span className="block-center"> available </span>    | method is available for this driver   |
| <span className="block-center">⛔️ </span> | <span className="block-center"> unavailable </span>  | method is not allowed for this driver | 
| <span className="block-center">🛣️ </span> | <span className="block-center"> routed </span>       | method is routed to another driver    | 

</div>