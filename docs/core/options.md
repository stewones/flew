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

Make sure to execute this only once. For angular users we have the `RecordsModule`(https://docs.reative.dev/angular/api#new-recordsmodule)

```js
import { Reative } from '@reative/core';

Reative.options = {
  silent: false,
  driver: 'parse'
};
```

## Available Drivers

- http
- firebase
- firestore
- parse
