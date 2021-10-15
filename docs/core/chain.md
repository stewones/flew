# Chaining API

|                                                                                                   | firestore | firebase | http | parse |
| ------------------------------------------------------------------------------------------------- | --------- | -------- | ---- | ----- |
| <a href="https://docs.reative.dev/core/api/#records-driver-name-records">driver</a>               | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-network-active-records">network</a>           | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-key-name-records">key</a>                     | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-query-by-records">query</a>                   | ⛔️        | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-where-field-operator-value-records">where</a> | ✅         | ✅        | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-sort-by-records">sort</a>                     | ✅         | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-size-value-records">size</a>                  | ✅         | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-at-value-records">at</a>                      | ✅         | ⛔️       | ⛔️   | ⛔️    |
| <a href="https://docs.reative.dev/core/api/#records-after-value-records">after</a>                | ✅         | ⛔️       | ⛔️   | ⛔️    |
| <a href="https://docs.reative.dev/core/api/#records-ref-path-records">ref</a>                     | ⛔️        | ✅        | ⛔️   | ⛔️    |
| <a href="https://docs.reative.dev/core/api/#records-raw-active-records">raw</a>                   | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-transform-transformfn-records">transform</a>  | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-diff-fn-records">diff</a>                     | ✅         | ✅        | ✅    | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-http-fn-records">http</a>                     | ⛔️        | ⛔️       | ✅    | ⛔️    |
| <a href="https://docs.reative.dev/core/api/#records-include-fields-records">include</a>           | ⛔️        | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-doc-value-records">doc</a>                    | ✅         | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-master-active-records">master</a>             | ⛔️        | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-token-session-records">token</a>              | ⛔️        | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-object-active-records">object</a>             | ⛔️        | ⛔️       | ⛔️   | ✅     |
| <a href="https://docs.reative.dev/core/api/#records-save-active-records">save</a>                 | ⚙         | ⚙        | ⚙    | ⚙     |
| <a href="https://docs.reative.dev/core/api/#records-ttl-value-records">ttl</a>                    | ⚙         | ⚙        | ⚙    | ⚙     |
| <a href="https://docs.reative.dev/core/api/#records-state-active-records">state</a>               | ⚙         | ⚙        | ⚙    | ⚙     |
| <a href="https://docs.reative.dev/core/api/#records-cache-active-records">cache</a>               | ⚙         | ⚙        | ⚙    | ⚙     |


✅ available ⛔️ unavailable ⚙ only in browser
---
id: chain
title: Chain
description: 'Set of operations for Rebased calls'
hide_title: false
---

The chaining api is responsible for operations we can do at runtime in a single call, combining queries and controlling results from drivers, state, cache and network all together.

## Example

For a fresh result from network we can do

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  from: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('a-random-kitty') // identify this result
  .cache(false) // never use cache as result
  .state(false) // never use memoized state as result
  .get('/images/search?size=small')
  .subscribe(kitty => console.log(kitty)); // fresh result from network
```

## Cache response

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  from: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('a-random-kitty') // identify this result
  .cache(true) // use cache as result
  .state(false) // never use memoized state as result
  .get('/images/search?size=small')
  // first result from this stream should be from cache
  // but network is still being requested
  // case network result differs from cache
  // the stream will end up having 2 responses in a row
  // unless the result from network is the same as in the cache
  // then you should expect only one response in this subscription
  .subscribe(kitty => console.log(kitty));
```

> Except for `.on` calls, all observables from fetch are destroyed internally once the network response lands.

## State response

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  from: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('a-random-kitty') // identify this result
  .cache(false) // don't use cache as result
  .state(true) //  use memoized state as result
  .get('/images/search?size=small')
  // first result from this stream should be from network
  // as there wasn't any memoized result yet
  // but network is still being requested
  // case a memoized state exists and network result differs from it
  // the stream will end up having 2 responses in a row
  // unless the result from network is the same as in the state
  // then you should expect only one response in this subscription
  .subscribe(kitty => console.log(kitty));
```

## All together

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  from: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('a-random-kitty') // identify this result
  .cache(true) // use cache as result
  .state(true) //  use memoized state as result
  .get('/images/search?size=small')
  // same rule above is applied in this sequence
  // 1 - response from cache or state (the faster one)
  // 2 - response from network (case it differs from previous result)
  .subscribe(kitty => console.log(kitty));
```

:::note
Cache and state are enabled by default in case of its packages are present and running
:::

## Using rxjs toPromise()

Another way to guarantee responses only from network, or in case you're working with fetch calls on server where there's no cache/state needs, you can take advantage of rxjs' `toPromise()`

```js
import { fetch } from '@rebased/core';

fetch('kitty', {
  silent: false,
  from: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .key('a-random-kitty') // identify this result
  .cache(true) // use cache as result
  .state(true) //  use memoized state as result
  .get('/images/search?size=small')
  .toPromise()
  // even though we have defined .cache and .state above
  // this promise will only be resolved once the network call land
  // and it will only have the network response as result
  .then(kitty => console.log(kitty));
```














































































































## Chain Availability
|                                                                       | http                                                        | firebase                                                    | firestore                                                   | parse                                                       |
| --------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| <a href="/core/api#RebasedCore+from">from</a>                         | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+network">network</a>                   | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+key">key</a>                           | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+query">query</a>                       | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+where">where</a>                       | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+sort">sort</a>                         | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+size">size</a>                         | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+at">at</a>                             | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     | <span className="block-center">⛔️</span>                    |
| <a href="/core/api#RebasedCore+after">after</a>                       | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+ref">ref</a>                           | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    |
| <a href="/core/api#RebasedCore+http">http</a>                         | <span className="block-center">✅</span>                     | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    |
| <a href="/core/api#RebasedCore+include">include</a>                   | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+doc">doc</a>                           | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+master">master</a>                     | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+token">token</a>                       | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+object">object</a>                     | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+cache">cache</a>                       | <small className="block-center">🛣️ <br />`browser`</small> | <small className="block-center">🛣️ <br />`browser`</small> | <small className="block-center">🛣️ <br />`browser`</small> | <small className="block-center">🛣️ <br />`browser`</small> |
| <a href="/core/api#RebasedCore+select">select</a>                     | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+state">state</a>                       | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+near">near</a>                         | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+withinKilometers">withinKilometers</a> | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+withinMiles">withinMiles</a>           | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">⛔️</span>                    | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+diff">diff</a>                         | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |
| <a href="/core/api#RebasedCore+response">response</a>                 | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     | <span className="block-center">✅</span>                     |


<div className="availability">

| symbol                                    | meaning                                              | description                               |
| ----------------------------------------- | ---------------------------------------------------- | ---------------------- ------------------ |
| <span className="block-center">✅ </span> | <span className="block-center"> available </span>    | method is available for this driver   |
| <span className="block-center">⛔️ </span> | <span className="block-center"> unavailable </span>  | method is not allowed for this driver | 
| <span className="block-center">🛣️ </span> | <span className="block-center"> routed </span>       | method is routed to another platform    | 

</div>
