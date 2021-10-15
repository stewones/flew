---
id: setup
title: Setup
description: 'Rebased Firebase setup'
hide_title: true
---

# Setup

## Install

```sh
npm install @rebased/firebase @rebased/core
```

## Configure

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="typescript"
values={[
{label: 'Typescript', value: 'typescript'},
{label: 'Angular', value: 'angular'}
]}>

<TabItem value="typescript">

```js
import 'firebase/auth';
import 'firebase/firestore';
import { install } from '@rebased/firebase';

install({
  // grab the config from firebase console
  config: {
    apiKey: '...',
    authDomain: '...',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...',
    measurementId: '...'
  }
});
```

</TabItem>
<TabItem value="angular">

```ts title="app.module.ts"
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseModule } from '@rebased/firebase';

@NgModule({
  // ...
  imports: [
    // ...
    FirebaseModule.forRoot({
      // grab the config from firebase console
      config: {
        apiKey: '...',
        authDomain: '...',
        projectId: '...',
        storageBucket: '...',
        messagingSenderId: '...',
        appId: '...',
        measurementId: '...'
      }
    })
  ]
})
export class AppModule {}
```

</TabItem>
</Tabs>

## Example

```ts
import { fetch } from '@rebased/core';

fetch('users')
  .from('firebase') // can also be firestore
  .where('id', '==', 54)
  .findOne()
  .subscribe(user => console.log(user));
```
