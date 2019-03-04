/**
 * A simple helper for getting the ionic storage config
 *
 * @export
 * @param {string} [db='app:db']
 * @param {string} [store='app:store']
 * @param {string} [driver=['indexeddb', 'sqlite', 'websql']]
 * @returns
 */
export function storageConfig(
  db = 'app:db',
  store = 'app:store',
  driver = ['indexeddb', 'sqlite', 'websql']
) {
  return {
    name: db,
    storeName: store,
    driverOrder: driver
  };
}
