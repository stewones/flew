---
title: Network
description: ''
position: 5
category: Guide
---

The Network package includes an opinionated `fetch` api and also ships a `http` driver by default powered by `axios`, but you can always write your own http plugin implementation whenever you need. Flew also provides other drivers as plugins so you can easily switch data source in runtime without the headache of refactoring the whole code base. Take a look at [`firebase`](/guide/firebase-plugin) and [`parse`](/guide/parse-plugin) plugins for more details.

## Install

```bash
npm install @flew/core @flew/network
```

## Configure

<code-group>
  <code-block label="Typescript" active>

```ts
import { setup } from '@flew/core';

setup({
  options: {
    silent: true, // disable internal logs
    driver: 'http', // set default driver
    baseURL: 'https://api.thecatapi.com',
    endpoint: '/v1',
    httpConfig: {
      timeout: 60 * 1000 * 10,
      // any other http option
    },
  },
  plugins: [
    // ... list of custom or oficial plugins
  ],
});
```

</code-block>
<code-block label="Node">

```js
const { setup } = require('@flew/core');

setup({
  options: {
    silent: true, // disable internal logs
    driver: 'http', // set default driver
    baseURL: 'https://api.thecatapi.com',
    endpoint: '/v1',
    httpConfig: {
      timeout: 60 * 1000 * 10,
      // any other axios http option
    },
  },
  plugins: [
    // ... list of custom or oficial plugins
  ],
});
```

</code-block>
</code-group>

## Network call

<code-group>
  <code-block label="Typescript" active>

```ts
import { fetch } from '@flew/network';

// Get a random kitty
fetch('kitty')
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

</code-block>
<code-block label="Node">

```js
const { fetch } = require('@flew/network');

// Get a random kitty
fetch('kitty')
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

</code-block>
</code-group>

## Overriding

With Flew you can always override default options and drivers in runtime, not to mention you can use the same chaining methods expecting the same result regardless the driver in use.

### Custom Options

```ts
fetch('kitty', {
  silent: false, // show logs
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1/images/search',
})
  .where('size', '==', 'small')
  .where('mime_types', '==', 'gif')
  .find() // same as http.get
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

### Custom Driver

```ts
fetch('kitty', {
  silent: false, // show logs
})
  .from('firestore') // use firestore driver from firebase
  .where('size', '==', 'small')
  .where('mime_types', '==', 'gif')
  .find()
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

## Chaining Methods

### object

Used to set whether or not return results as ParseObject. `Default: false`

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty').from('parse').object(true).find().subscribe();
```

### http

Used to configure http instance in runtime.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty', {
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1',
})
  .http(config => {
    // modify axios config
    config.headers['Authorization'] = 'Bearer xyz';
  })
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

### from

Used to configure driver in runtime. `Default: http`

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').from('firebase').subscribe();
fetch('kitty').from('firestore').subscribe();
fetch('kitty').from('parse').subscribe();
fetch('kitty').from('http').subscribe();
```

### network

Used to set whether or not make an actual network call. `Default: true`

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').network(true).find().subscribe();
fetch('kitty').network(false).find().subscribe();
```

### cache

Used to set whether or not use results from cache. `Default: true`

<badge>client</badge>
<badge>server</badge>
<badge>cache</badge>

```ts
fetch('kitty').cache(true).find().subscribe();
fetch('kitty').cache(false).find().subscribe();
```

### key

Used to define a custom key internally which can also be used to grab or set data externally. `Default: auto-generated based on requested payload`

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .key('my-custom-key')
  .where('size', '==', 'small')
  .find()
  .subscribe();

getState('my-custom-key');
setState('my-custom-key');

getCache('my-custom-key');
setCache('my-custom-key');
```

### query

Used to make complex queries based on [Parse JS Client SDK](http://parseplatform.org/Parse-SDK-JS/api/3.4.1/).

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

#### Simple request

```ts
fetch('kitty')
  .from('parse')
  .query({
    equalTo: () => ['size', 'small'],
  })
  .findOne();
```

#### `and` operator

```ts
fetch('kitty')
  .from('parse')
  .query({
    and: [
      {
        equalTo: () => ['size', 'small'],
      },
      {
        greaterThanOrEqualTo: () => ['createdAt', new Date()],
      },
    ],
  })
  .findOne();
```

#### `or` operator

```ts
fetch('kitty')
  .from('parse')
  .query({
    or: [
      {
        equalTo: () => ['size', 'small'],
      },
      {
        equalTo: () => ['size', 'large'],
      },
    ],
  })
  .findOne();
```

#### `aggregate` operator

```ts
fetch('kitty')
  .from('parse')
  .query({
    aggregate: [
      {
        $match: {
          size: 'small',
        },
      },
    ],
  })
  .find();
```

### where

Used to restraint data results by compounding queries.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .where('mime_types', '==', 'gif')
  .find()
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err),
  );
```

### sort

Used to sort data results by compounding queries.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .find()
  .subscribe();
```

### size

Used to limit data length results by compounding queries.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .size(5)
  .find()
  .subscribe();
```

### at after

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

Used to add a cursor and define the start point for a query. The `at()` method includes the start point, while the `after()` method excludes it.

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .at(20)
  .find()
  .subscribe();

fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .after(20)
  .find()
  .subscribe();
```

### ref

Used to define a document path for a request.

<badge>client</badge>
<badge>server</badge>
<badge>firebase</badge>

```ts
fetch('kitty').ref('lovely/cats').on().subscribe();
```

### include

Used to include data from a Parse relationship.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .include(['owner'])
  .find()
  .subscribe();
```

### doc

Used to define a document id to make update/delete operations.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>
<badge>firestore</badge>

```ts
fetch('kitty')
  .doc('some-id')
  .update({
    size: 'small',
  })
  .subscribe();
```

### token

Used to define an `Authorization` token header.

<badge>client</badge>
<badge>server</badge>
<badge>http</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .token('my-access-token')
  .subscribe();
```

### master

Used to define whether or not use Parse's Master Key. `Default: false`

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty')
  .doc('some-id')
  .update({
    size: 'small',
  })
  .master(true)
  .subscribe();
```

### select

Used to define what attribute should be returned in the response.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .size(5)
  .select(['name', 'size'])
  .subscribe();
```

### state

Used to set whether or not use results from memory. `Default: true`

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').state(true).find().subscribe();
fetch('kitty').state(false).find().subscribe();
```

### near

Adds a proximity based constraint for finding objects with key point values near the point given.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
import { geopoint } from '@flew/parse';

fetch('kitty')
  .where('size', '==', 'small')
  .near('location', geopoint(40.0, -30.0))
  .find()
  .subscribe();
```

### withinKilometers

Adds a proximity based constraint for finding objects with key point values near the point given and within the maximum distance given. Radius of earth used is 6371.0 kilometers.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
import { geopoint } from '@flew/parse';

fetch('kitty')
  .where('size', '==', 'small')
  .withinKilometers('location', geopoint(40.0, -30.0))
  .find()
  .subscribe();
```

### withinMiles

Adds a proximity based constraint for finding objects with key point values near the point given and within the maximum distance given. Radius of earth used is 3958.8 miles.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
import { geopoint } from '@flew/parse';

fetch('kitty')
  .where('size', '==', 'small')
  .withinMiles('location', geopoint(40.0, -30.0))
  .find()
  .subscribe();
```

### diff

Used to customize Flew's internal differentiating test to determine whether or not a result should be delivered in the subscribe stream.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .diff((cache, network) => {
    if (cache !== network) {
      return true;
    }

    return false;
  })
  .find()
  .subscribe();
```

### response

Used to hook into Flew's network data regardless differentiating test.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .response(network => {
    // response from network is always delivered in here
    console.log(network);
  })
  .find()
  .subscribe(cacheOrStateOrNetwork => {
    // response from network might not be delivered in here
    // if cache or state has been already delivered
    // and is the same as network result
    console.log(cacheOrStateOrNetwork);
  });
```

### context

Used to set custom call attributes.

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .context({
    here: 'is',
    a: 'custom',
    context: 'which',
    can: 'be',
    captured: 'within',
    parse: 'hooks',
  })
  .find()
  .subscribe();
```

## Chaining Verbs

Verbs are all the final methods contained in a `fetch` chain.

### get

Same as the `find` method.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').where('size', '==', 'small').get().subscribe();
```

### delete

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').doc('some-id').delete().subscribe();
fetch('kitty').where('size', '==', 'small').delete().subscribe();
```

### post

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .post(url, {
    name: 'frajola',
  })
  .subscribe();
```

### patch

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .patch(url, {
    name: 'Frajola',
  })
  .subscribe();
```

### find

same as the `get` method.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty').where('size', '==', 'small').find().subscribe();
```

### findOne

same as the `find` method but returns the first result only.

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .where('size', '==', 'small')
  .sort({ createdAt: 'desc' })
  .findOne()
  .subscribe();
```

### set

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .set({
    name: 'Tom',
  })
  .subscribe();
```

### update

<badge>client</badge>
<badge>server</badge>
<badge>network</badge>

```ts
fetch('kitty')
  .doc('some-id')
  .update({
    name: 'Garfield',
  })
  .subscribe();
```

### on

<badge>client</badge>
<badge>server</badge>
<badge>firebase</badge>
<badge>firestore</badge>
<badge>parse</badge>

```ts
fetch('kitty').doc('some-id').on().subscribe();
```

### count

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty').where('size', '==', 'small').count().subscribe();
```

### run

<badge>client</badge>
<badge>server</badge>
<badge>parse</badge>

```ts
fetch('kitty')
  .run('MyCloudFunction', { some: 'custom', attributes: true })
  .subscribe();
```
