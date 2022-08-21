import { isArray } from 'lodash';

/**
 * Set where clause standardized
 *
 * @export
 * @param {*} q
 * @param {*} connector
 */
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

    /**
     * @deprecated in favor of in
     */
    case 'array-contains':
      connector.containedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    case 'in':
      connector.containedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    /**
     * @deprecated in favor of !in
     */
    case 'not-in':
      connector.notContainedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    case '!in':
      connector.notContainedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    default:
      break;
  }
}
