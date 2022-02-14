---
title: Setup
description: ''
position: 4
category: Guide
---

As easy as cake Start working with Flew in 2 easy steps, for any framework, either on client or server.

## Install

```bash
npm install @flew/core
```

## Configure

<code-group>
  <code-block label="Typescript" active>

```ts
import { setup } from '@flew/core';

setup({
  options: {
    // ... list of options
  },
  plugins: [
    // ... list of plugins
  ],
});
```

</code-block>
<code-block label="Node">

```js
const { setup } = require('@flew/core');

setup({
  options: {
    // ... list of options
  },
  plugins: [
    // ... list of plugins
  ],
});
```

</code-block>
</code-group>

## Options

Set of [Flew options](https://github.com/flewjs/flewjs/blob/master/packages/core/src/structure/options.ts) for initialization

| name             | default             | description                                                                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| identifier       | `objectId`          | column or field name used to identify your data                                                                                 |
| disableAutoID    | `false`             | automatically create an id for each new record/document                                                                         |
| baseURL          | `null`              | http only. eg: `https://api.thecatapi.com`                                                                                      |
| endpoint         | `null`              | http only. eg: `/v1`                                                                                                            |
| pathname         | `null`              | http only. eg: `/some/long/path/to/the/resource?with=params&items=true`                                                         |
| httpConfig       | `FlewRequestConfig` | used to extend http config. [`learn more`](https://github.com/flewjs/flewjs/blob/master/packages/core/src/structure/request.ts) |
| driver           | `http`              | default driver. can also be customized in runtime `fetch('User').from('parse')`                                                 |
| timestampEnabled | `true`              | enable/disable timestamp auto creation                                                                                          |
| timestampObject  | `false`             | whether or not use `Date` object or `toISOString`                                                                               |
| timestampCreated | `created_at`        | field name for the "created" timestamp                                                                                          |
| timestampUpdated | `updated_at`        | field name for the "updated" timestamp                                                                                          |
| silent           | `false`             | whether or not display internal logs                                                                                            |
| logger           | `Logger`            | logger instance                                                                                                                 |
| useCache         | `true`              | whether or not use cached results in the fetch stream                                                                           |
| useState         | `true`              | whether or not use memoized network state in the fetch stream                                                                   |
| useNetwork       | `true`              | enable/disable network calls                                                                                                    |
| persistence 🧪   | `doc_id`            | firestore only. experimental persistence layer for tabs                                                                         |
