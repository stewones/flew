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
| useState         | `true`       | whether use memoized state for results                                                                            |

## Available Drivers

- http
- firebase
- firestore
- parse
