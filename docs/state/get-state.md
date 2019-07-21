# Get State

Once you've made a verb call and response has arrived, it should automatically be synced with the internal store. But what if we need to pick a specific portion of data later on.

```typescript
import { getState } from '@reative/state';

// ...

const currentNumbers = getState('numbers');
console.log(currentNumbers);
// [
//   {
//     id: 1,
//     code: 'one'
//   },
//   {
//     id: 2,
//     code: 'two'
//   },
//   {
//     id: 3,
//     code: 'three'
//   }
// ]
```

The **getState** method is prepared to handle even elastic search responses, where data is stored like this:

```javascript
{
  "took": 1,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 3,
    "max_score": 6.790704,
    "hits": [
      {
        "_index": "numbers",
        "_type": "number",
        "_id": 1,
        "_score": 6.790704,
        "_source": {
          "id": 1,
          "code": 1
        }
      }
    ]
  }
}
```

#### 

#### Get raw data

Perhaps there may be a case where you need the original data without any filter.

```typescript
import { getState } from '@reative/state';

// ...

const currentNumbers = getState('numbers', { raw: true });
console.log(currentNumbers);

// {
//   "took": 1,
//   "timed_out": false,
//   "_shards": {
//     "total": 1,
//     "successful": 1,
//     "skipped": 0,
//     "failed": 0
//   },
//   "hits": {
//     "total": 3,
//     "max_score": 6.790704,
//     "hits": [
//       {
//         "_index": "numbers",
//         "_type": "number",
//         "_id": 1,
//         "_score": 6.790704,
//         "_source": {
//           "id": 1,
//           "code": 1
//         }
//       },
//       {
//         "_index": "numbers",
//         "_type": "number",
//         "_id": 2,
//         "_score": 5.79070,
//         "_source": {
//           "id": 2,
//           "code": 2
//         }
//       },
//       {
//         "_index": "numbers",
//         "_type": "number",
//         "_id": 3,
//         "_score": 4.7907,
//         "_source": {
//           "id": 3,
//           "code": 3
//         }
//       }
//     ]
//   }
// }
```

