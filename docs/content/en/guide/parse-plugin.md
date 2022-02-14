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
import { parsePlugin } from '@flew/parse';

setup({
  options: {
    driver: 'parse',
    silent: true, // disable internal logs
  },
  plugins: [
    parsePlugin({
      appID: 'MyParseAppId',
      serverURL: 'http://localhost:1337/parse',
      masterKey: 'MyParseAppMasterKey',
    }),
  ],
});
```

</code-block>
<code-block label="Node">

```js
const Parse = require('parse/node');
const { setup } = require('@flew/core');
const { parsePlugin } = require('@flew/parse');

setup({
  options: {
    driver: 'parse',
    silent: true, // disable internal logs
  },
  plugins: [
    parsePlugin(
      {
        appID: 'MyParseAppId',
        serverURL: 'http://localhost:1337/parse',
        masterKey: 'MyParseAppMasterKey',
      },
      Parse,
    ),
  ],
});
```

</code-block>
</code-group>

> Note that when running on Node we need to pass the Parse instance along the plugin to keep its reference internally.

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
</code-group>
