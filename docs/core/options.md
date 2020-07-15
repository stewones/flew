---
id: options
title: Options
description: 'Set of options for Rebased initialisation'
hide_title: false
---

Set of options for Rebased initialisation

| name             | default      | description                                                                                                       |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| identifier       | `doc_id`     | created automatically for each new document                                                                       |
| baseURL          | `null`       | used for http driver. eg: `https://api.thecatapi.com`                                                             |
| endpoint         | `null`       | used for http driver. eg: `/v1`                                                                                   |
| httpConfig       | `{}`         | used to extend http config. see [`AxiosRequestConfig`](https://github.com/axios/axios/blob/master/index.d.ts#L43) |
| driver           | `http`       | used for any fetch call                                                                                           |
| timestamp        | `true`       | enable/disable timestamp auto creation                                                                            |
| timestampCreated | `created_at` | field name for created timestamp                                                                                  |
| timestampUpdated | `updated_at` | field name for updated timestamp                                                                                  |
| silent           | `false`      | whether or not display internal logs                                                                              |
| useCache         | `true`       | whether use cache for results                                                                                     |
| useMemo          | `true`       | whether use memoized state for results                                                                            |

## Applying Globally

Make sure to execute this only once. For angular users we have the [`RebasedModule`]()

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="vanilla"
values={[
{label: 'Vanilla', value: 'vanilla'},
{label: 'Angular', value: 'angular'}
]}>
<TabItem value="vanilla">

```js
import { Rebased } from '@rebased/core';

Rebased.options = {
  silent: false,
  driver: 'parse'
};
```

</TabItem>
<TabItem value="angular">

```ts
import { RebasedModule } from '@rebased/angular';

RebasedModule.forRoot({
  driver: 'parse', // define default data driver
  silent: false, // whether show logs
  timestamp: false // auto save timestamp
});
```

</TabItem>
</Tabs>

## Available Drivers

- http
- firebase
- firestore
- parse
