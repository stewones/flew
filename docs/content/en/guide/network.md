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

...

### http

...

### from

...

### network

...

### cache

...

### key

...

### query

...

### where

...

### sort

...

### size

...

### at

...

### after

...

### ref

...

### include

...

### doc

...

### token

...

### master

...

### select

...

### state

...

### near

...

### withinKilometers

...

### withinMiles

...

### diff

...

### response

...

### context

## Chaining Verbs

Verbs are all the final methos contained in a chain.

### get

...

### delete

...

### post

...

### patch

...

### find

...

### findOne

...

### set

...

### update

...

### on

...

### count

...

### run

...
