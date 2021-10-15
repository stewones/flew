import { setWhere } from './setWhere';

/**
 * Apply where on query
 *
 * @export
 * @param {*} [query=[]]
 * @param {*} connector
 */
export function where(query = [], connector) {
  const mapping = {
    id: 'objectId',
  };
  query.map(q => {
    if (mapping[q.field]) q.field = mapping[q.field];
    setWhere(q, connector);
  });
}
