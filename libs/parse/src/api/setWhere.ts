import { isArray } from 'lodash';

export function setWhere(q, connector) {
  switch (q.operator) {
    case '==':
      connector.equalTo(q.field, q.value);
      break;

    case '>=':
      connector.greaterThanOrEqualTo(q.field, q.value);
      break;

    case '<=':
      connector.lessThanOrEqualTo(q.field, q.value);
      break;

    case '>':
      connector.greaterThan(q.field, q.value);
      break;

    case '<':
      connector.lessThan(q.field, q.value);
      break;

    case 'array-contains':
      connector.containedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    default:
      break;
  }
}
