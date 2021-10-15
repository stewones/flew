/**
 * Apply limit on query
 *
 * @export
 * @param {number} it
 * @param {*} connector
 */
export function limit(it: number, connector: any) {
  connector.limit(it);
}
