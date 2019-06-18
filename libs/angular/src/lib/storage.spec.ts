import { storageConfig } from './storage';

describe('Storage Config', () => {
  it('should return recommended config', () => {
    expect(storageConfig()).toEqual({
      name: 'app:db',
      storeName: 'app:store',
      driverOrder: ['sqlite', 'indexeddb', 'localstorage', 'websql']
    });
  });
});
