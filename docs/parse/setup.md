---
id: setup
title: Setup
description: 'Rebased Parse setup'
hide_title: true
---

# Setup

## Install

```sh
npm install @rebased/parse @rebased/core
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
import { install } from '@rebased/parse';

install({
  serverURL: 'http://localhost:1337/parse',
  appID: 'a1b2c3'
});
```

</TabItem>
<TabItem value="angular">

```ts title="app.module.ts"
import { ParseModule } from '@rebased/parse';

@NgModule({
  // ...
  imports: [
    // ...
    FirebaseModule.forRoot({
      serverURL: 'http://localhost:1337/parse',
      appID: 'a1b2c3'
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
  .from('parse')
  .where('id', '==', 54)
  .findOne()
  .subscribe(user => console.log(user));
```
