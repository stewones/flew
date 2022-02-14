---
title: Cache Plugin
description: ''
position: 8
category: Guide
---

[Cache plugin](https://github.com/flewjs/flewjs/tree/master/packages/cache/src) provides an useful api for manipulating everything about cache. It's also integrated deep inside Flew's network calls to internally handle it for you.

> The cache plugin is suited to work on client side only. It won't work on server.

## Install

```bash
npm install @flew/core @flew/network @flew/cache
```

## Configure

```ts
import { setup } from '@flew/core';
import { cachePlugin } from '@flew/cache';

setup({
  options: {
    silent: true, // disable internal logs
  },
  plugins: [
    cachePlugin({
      name: 'MyApp',
      store: 'MyAppCache',
    }),
  ],
});
```

## Network call

```ts
import { fetch } from '@flew/network';
import { lastValueFrom } from 'rxjs';

// create user
const newUser = await lastValueFrom(
  fetch('User').set({
    name: 'John',
  }),
).then(result => console.log(result));

// Output
// { name: "John", objectId: "a1b2c3" }

// update user
await lastValueFrom(
  fetch('User').doc(newUser.objectId).update({
    name: 'John Doe',
  }),
);

// get user for the very first time (it will be cached)
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Stream outputs 1 result
// { name: "John Doe", objectId: "a1b2c3" }

// Update user again
await lastValueFrom(
  fetch('User').doc(newUser.objectId).update({
    name: 'John Snow',
  }),
);

// get user
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Now stream outputs 2 results in a row
// since we had 1 result cached before
// { name: "John Doe", objectId: "a1b2c3" }
// { name: "John Snow", objectId: "a1b2c3" }
```

## Disable cache in runtime

```ts
fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .cache(false) // <- this will disable cache for this call
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );

// Since cache is disabled, the stream will
// always deliver a fresh result from network
// { name: "John Snow", objectId: "a1b2c3" }
```

## Use arbitrary APIs

With Flew's cache plugin you don't need to exclusively depend on the internal cache behavior. You can also define custom cached results, or whatever you want, to reuse later.

### Set a custom cache

```ts
import { setCache, getCache } from '@flew/cache'

fetch('User')
  .where('objectId', '==', 'a1b2c3')
  .cache(false) // <- disable default cache behavior
  .findOne()
  .subscribe(
    async user => {
        await setCache('My-Custom-Cache', {
            myUser: user
        })

        const cachedUser = await getCache('My-Custom-Cache');

        console.log(cachedUser);
        // Output
        // { myUser: { name: "John Snow", objectId: "a1b2c3" }}
        }
    },
    err => console.log(err),
  );
```

### Clean up cached data

```ts
import { resetCache, setCache } from '@flew/cache';

// Resets the whole cache store
resetCache();

// Clears cache by a given key
setCache('My-Custom-Cache', null);
```
