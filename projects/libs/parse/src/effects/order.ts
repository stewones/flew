import { isArray, isEmpty, isObject } from 'lodash';

export function order(sort: any, connector: any) {
  if (isArray(sort)) {
    // this.log().success()(`parse sort array -> ${sort}`);
    sort.map(s => {
      if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
      for (const k in s) {
        if (s[k] === 'asc') {
          connector.ascending(k);
        }
        if (s[k] === 'desc') {
          connector.descending(k);
        }
      }
    });
  } else if (isObject(sort)) {
    // this.log().success()(`parse sort object -> ${JSON.stringify(sort)}`);
    if (isEmpty(sort)) throw new Error(`sort object can't be null`);
    for (const k in sort) {
      if (sort[k] === 'asc') {
        connector.ascending(k);
      }
      if (sort[k] === 'desc') {
        connector.descending(k);
      }
    }
  }
}
