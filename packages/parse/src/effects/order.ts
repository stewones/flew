import { isArray, isEmpty, isObject } from 'lodash';

/**
 * Apply order on query
 *
 * @export
 * @param {*} sort
 * @param {*} connector
 */
export function order(sort: any, connector: any) {
  const asc = [];
  const desc = [];

  if (isArray(sort)) {
    sort.map(s => {
      if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
      for (const k in s) {
        if (s[k] === 'asc') {
          asc.push(k);
        }
        if (s[k] === 'desc') {
          desc.push(k);
        }
      }
    });
  } else if (isObject(sort)) {
    if (isEmpty(sort)) throw new Error(`sort object can't be null`);
    for (const k in sort) {
      if (sort[k] === 'asc') {
        asc.push(k);
      }
      if (sort[k] === 'desc') {
        desc.push(k);
      }
    }
  }

  if (asc.length > 0) {
    connector.addAscending(asc.join(','));
  }
  if (desc.length > 0) {
    connector.addDescending(desc.join(','));
  }
}
