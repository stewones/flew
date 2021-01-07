---
id: fetch
title: Fetch
description: 'Unique api for data access'
hide_title: false
---

The fetch api on Rebased is how we access data whether using http, firebase, firestore or parse. The goal is to provide a single and straightforward api for CRUD operations. Every fetch call returns an rxjs observable which you can take advantage of its vast set of operators to pipe and transform the result.

### Doing a simple http call

```js
import { fetch } from '@rebased/core';
import { map } from 'rxjs/operators';

// Get a random kitty
fetch('kitty', {
  silent: false, // don't show logs
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .from('http') // use http driver
  .get('/images/search?size=small&mime_types=gif')
  .pipe(map(it => it[0])) // transform the result
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err)
  );
```

> See more at [example source](https://github.com/rebasedjs/examples/blob/master/node/fetch.js)

### Switching drivers at runtime

```js
import { fetch } from '@rebased/core';

['firestore', 'firebase', 'http'].map(driver =>
  fetch('kitty', {
    silent: true, // show logs
    baseURL: 'https://api.thecatapi.com', // http only
    endpoint: '/v1' // http only
    pathname: '/images/search' // http only
  })
    .from(driver)
    .where('size', '==', 'small')
    .where('mime_types', '==', 'gif')
    .size(1)
    .find()
    .subscribe(
      kitty => console.log(kitty, 'from', driver),
      err => console.log(err, 'from', driver)
    )
);
```

:::info
Rebased APIs from `firebase/firestore` follows pretty much the same standard as in the official Google's SDK
:::
