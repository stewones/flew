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
