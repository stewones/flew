---
id: setup
title: Setup
description: 'Rebased setup'
hide_title: true
---

# Setup

The Rebased core is composed of the foundation necessary so that other pieces can fit together. It also ships the `http` driver which is used for fetching data as default. Rebased also provides another drivers so you can easy switch data source without refactoring the whole code. In case you need to connect with other drivers you can just install packages like `firebase` and `parse` or even create your own.

## Install

```sh
npm install @rebased/core
```

## Configure

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="typescript"
values={[
{label: 'Typescript', value: 'typescript'},
{label: 'Node', value: 'node'},
{label: 'Angular', value: 'angular'}
]}>
<TabItem value="node">

```js
const { install } = require('@rebased/core');

install({
  silent: true, // disable logs
  driver: 'firestore', // default driver
  timestampCreated: 'createdAt',
  timestampUpdated: 'updatedAt',
  identifier: 'objectId' // auto generated id
});
```

</TabItem>
<TabItem value="typescript">

```js
import { install } from '@rebased/core';

install({
  silent: true, // disable logs
  driver: 'firestore', // default driver
  timestampCreated: 'createdAt',
  timestampUpdated: 'updatedAt',
  identifier: 'objectId' // auto generated id
});
```

</TabItem>
<TabItem value="angular">

```ts title="app.module.ts"
import { RebasedModule } from '@rebased/angular';

RebasedModule.forRoot({
  silent: true, // disable logs
  driver: 'firestore', // default driver
  timestampCreated: 'createdAt',
  timestampUpdated: 'updatedAt',
  identifier: 'objectId' // auto generated id
});
```

</TabItem>
</Tabs>

## Example

```js
// Get a random kitty
fetch('kitty', {
  silent: false, // show logs
  baseURL: 'https://api.thecatapi.com',
  endpoint: '/v1'
})
  .from('http') // use http driver
  .get('/images/search?size=small&mime_types=gif')
  .subscribe(
    kitty => console.log(kitty),
    err => console.log(err)
  );
```
