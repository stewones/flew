---
id: setup
title: Setup
description: 'Rebased cache setup'
hide_title: true
---

# Setup

The Rebased cache is built upon [localForage](https://github.com/localForage/localForage)

## Install

```sh
npm install @rebased/cache @rebased/core
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
import { install } from '@rebased/cache';

install('my-db', 'my-store');
```

</TabItem>
<TabItem value="angular">

```ts title="app.module.ts"
import { CacheModule } from '@rebased/angular';

@NgModule({
  // ...
  imports: [
    // ...
    CacheModule.forRoot({
      dbName: 'my-db',
      dbStore: 'my-store'
    })
  ]
})
export class AppModule {}
```

</TabItem>
</Tabs>

## Example

```ts
import { getCache, setCache } from '@rebased/cache';

async function run() {
  await setCache('person', { firstName: 'John', lastName: 'Doe' });
  console.log(await getCache('person'));
  // { firstName: "John", lastName: "Doe" }
}

run();
```
