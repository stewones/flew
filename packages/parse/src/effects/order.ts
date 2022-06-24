import { isArray, isEmpty, isObject } from 'lodash';

/**
 * Apply order on query
 *
 * @export
 * @param {*} sort
 * @param {*} connector
 */
export function order(sort: any, connector: any) {
  if (isArray(sort)) {
    sort.map(s => {
      if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
      for (const k in s) {
        if (s[k] === 'asc') {
          connector.addAscending(k);
        }
        if (s[k] === 'desc') {
          connector.addDescending(k);
        }
      }
    });
  } else if (isObject(sort)) {
    if (isEmpty(sort)) throw new Error(`sort object can't be null`);
    for (const k in sort) {
      if (sort[k] === 'asc') {
        connector.addAscending(k);
      }
      if (sort[k] === 'desc') {
        connector.addDescending(k);
      }
    }
  }
}
