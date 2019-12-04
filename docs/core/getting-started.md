# Getting Started

There's a bunch of reative packages which each one is responsible for a special feature. Easy as cake this is a good start point.

## Installation

```bash
$ npm install --save @reative/core
```

### Doing a simple http call

```js
import { collection, Response } from '@reative/core';

// Get a random kitty

collection('kitty', {
  silent: false,
  driver: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .transform((data: Response) => data.data[0])
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(kitty => console.log(kitty), err => console.log(err));
```

### Configuring options only once

```js
import { collection, Response, Reative } from '@reative/core';

Reative.options = {
  silent: false,
  driver: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
};

// Get a random kitty
collection('kitty')
  .transform((data: Response) => data.data[0])
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(kitty => console.log(kitty), err => console.log(err));
```

### Changing driver in runtime

```js
import { collection, Response, Reative } from '@reative/core';

Reative.options = {
  silent: false,
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
};

// Get a kitty from http and firestore
// using the same api

['firestore', 'http'].map(driver =>
  collection('kitty')
    .driver(driver, {
      endpoint: '/v1/images/search?size=small&mime_types=gif' // this is used by http only
    })
    .transform((data: Response) => data.data[0])
    .where('size', '==', 'small') // this is used by firestore only
    .where('mime_types', '==', 'gif') // this is used by firestore only
    .find()
    .subscribe(kitty => console.log(kitty), err => console.log(err))
);
```

> For `firebase` and `firestore` drivers, reative api follows pretty much the same as is in the oficial google's sdk
