# Options

| name             | default      | description                                                                                                       |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| identifier       | `doc_id`     | auto created for each new document                                                                                |
| baseURL          | `null`       | used for http driver. eg: `https://api.thecatapi.com`                                                             |
| endpoint         | `null`       | used for http driver. eg: `/v1`                                                                                   |
| httpConfig       | `{}`         | used to extend http config. see [`AxiosRequestConfig`](https://github.com/axios/axios/blob/master/index.d.ts#L43) |
| driver           | `firestore`  | used for any collection call                                                                                      |
| timestamp        | `true`       | whether or not to add created/updated fields automatically                                                        |
| timestampCreated | `created_at` | custom field name for the created timestamp                                                                       |
| timestampUpdated | `updated_at` | custom field name for the updated timestamp                                                                       |
| silent           | `true`       | whether or not display internal logs to browser's console                                                         |
| useCache         | `true`       | whether collections should use cache for the results                                                              |
| useCache         | `true`       | whether collections should use state for the results                                                              |
| saveNetwork      | `true`       | whether collections should save the results in cache                                                              |

## Applying Globally

Make sure to execute this only once. For angular users we have the [`RecordsModule`](https://docs.reative.dev/angular/api#new-recordsmodule)

```js
import { Reative } from '@reative/core';

Reative.options = {
  silent: false,
  driver: 'parse'
};
```
---
id: options
title: Options
description: 'Set of options for Rebased initialisation'
hide_title: false
---

Set of options for Rebased initialisation

| name             | default              | description                                                                                           |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------------- |
| collection       | `null`               | Data "table" and internal identifier. eg: `users`.                                                    |
| identifier       | `doc_id`             | column name for auto id generation                                                                    |
| disableAutoID    | `false`              | created automatically for each new document                                                           |
| baseURL          | `null`               | http only. eg: `https://api.thecatapi.com`                                                            |
| endpoint         | `null`               | http only. eg: `/v1`                                                                                  |
| pathname         | `null`               | http only. eg: `/some/long/path/to/the/resource?with=params&items=true`                               |
| httpConfig       | `AxiosRequestConfig` | used to extend http config. [`learn more`](https://github.com/axios/axios/blob/master/index.d.ts#L43) |
| from             | `http`               | driver set for a call in runtime                                                                      |
| driver           | `http`               | default http driver applied for any fetch call                                                        |
| timestampEnabled | `true`               | enable/disable timestamp auto creation                                                                |
| timestampObject  | `false`              | whether use `new Date()` object or `toISOString()`                                                    |
| timestampCreated | `created_at`         | field name for created timestamp                                                                      |
| timestampUpdated | `updated_at`         | field name for updated timestamp                                                                      |
| silent           | `false`              | whether or not display internal logs                                                                  |
| logger           | `Logger`             | custom logger instance                                                                                |
| useCache         | `true`               | whether use cache for results                                                                         |
| useState         | `true`               | whether use memoized state for results                                                                |
| useNetwork       | `true`               | wherer use network                                                                                    |
| persistence 🧪   | `doc_id`             | firestore only. experimental persistence layer                                                        |

## Available Drivers

- http
- firebase
- firestore
- parse
