---
title: Parse Plugin
description: ''
position: 7
category: Guide
---

[Parse plugin](https://github.com/flewjs/flewjs/blob/master/packages/parse/src/driver/parse.ts) provides the bridge necessary to work with [Parse JS Client SDK](http://parseplatform.org/Parse-SDK-JS/api/3.4.1/) through the intuitive Flew's fetch api.

## Install

```bash
npm install @flew/core @flew/network @flew/parse
```

## Configure

<code-group>
  <code-block label="Typescript" active>

```ts
import { setup } from '@flew/core';
import { firebasePlugin } from '@flew/firebase';

setup({
  options: {
    // firebase driver means the Realtime database.
    // you can also use "firestore" as option.
    driver: 'firebase',
    silent: true, // disable internal logs
  },
  plugins: [firebasePlugin()],
});
```

</code-block>
<code-block label="Node">

```js
const { setup } = require('@flew/core');
const { firebasePlugin } = require('@flew/firebase');

setup({
  options: {
    // firebase driver means the Realtime database.
    // you can also use "firestore" as option.
    driver: 'firebase',
    silent: true, // disable internal logs
  },
  plugins: [firebasePlugin()],
});
```

</code-block>
</code-group>

## Network call

<code-group>
  <code-block label="Typescript" active>

```ts
import { fetch } from '@flew/network';
import { lastValueFrom } from 'rxjs';

// create user
const newUser = await lastValueFrom(
  fetch('User').set({
    name: 'John',
  }),
);

// update user
await lastValueFrom(
  fetch('User').doc(newUser.objectId).update({
    name: 'John Doe',
  }),
);

// get user
fetch('User')
  .where('name', '==', 'John Doe')
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );
```

</code-block>
<code-block label="Node">

```js
const { fetch } = require('@flew/network');
const { lastValueFrom } = require('rxjs');

// create user
const newUser = await lastValueFrom(
  fetch('User').set({
    name: 'John',
  }),
);

// update user
await lastValueFrom(
  fetch('User').doc(user.objectId).update({
    name: 'John Doe',
  }),
);

// get user
fetch('User')
  .where('name', '==', 'John Doe')
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );
```

</code-block>
</code-group>
