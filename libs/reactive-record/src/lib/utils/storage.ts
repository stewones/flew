/**
 * A simple helper for getting the ionic storage config
 */
export function storageConfig(
  db = 'app:db',
  store = 'app:store',
  driver = ['sqlite', 'indexeddb', 'localstorage']
) {
  return {
    name: db,
    storeName: store,
    driverOrder: driver
  };
}
