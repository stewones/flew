---
title: Firebase Plugin
description: ''
position: 6
category: Guide
---

[Firebase plugin](https://github.com/intenseloop/flew/tree/master/packages/firebase/src/driver) provides everything you need to work with Firebase and/or Firestore as your data source. The fetch api and its chaining methods are heavily inspired by Firebase SDK so you should feel at home without the overhead of packages like AngularFire. Keep in mind that this plugin as well as any other Flew package is completely framework-agnostic, meaning you can write once and deploy everywhere.

## Install

```bash
npm install @flew/core @flew/network @flew/firebase
```

## Configure

<code-group>
  <code-block label="Typescript" active>

```ts
import { setup } from '@flew/core';
import { firebasePlugin } from '@flew/firebase';

setup({
  options: {
    // firebase driver means the realtime database.
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
  .findOne()
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
  .findOne()
  .subscribe(
    user => console.log(user),
    err => console.log(err),
  );
```

</code-block>
</code-group>
