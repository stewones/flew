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

### The same call but as a promise

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
  .toPromise()
  .then(kitty => console.log(kitty))
  .catch(err => console.log(err));
```

> use promises carefully, especially if you're expecting results from cache or state.

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
// both using the same api

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

> Reative api for `firebase` and `firestore` drivers follows pretty much the same as is in the oficial Google's SDK

### Using the class decorator @Collection

```js
import { Collection, Response, Records } from '@reative/core';

@Collection({
  name: 'kitty',
  driver: 'http',
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
class KittyService {
  $collection: Records;
}

const kittyService = new KittyService();

// Get a random kitty
kittyService.$collection
  .transform((data: Response) => data.data[0])
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(kitty => console.log(kitty), err => console.log(err));
```
