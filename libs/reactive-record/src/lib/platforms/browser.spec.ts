import { PlatformBrowser } from './browser';
import { StorageAdapter } from '../interfaces/storage';
import { Config } from '../symbols/rr';

describe('Browser Platform', () => {
  let lib: PlatformBrowser;
  const baseURL = 'http://firetask.dev';
  const collection = 'foo-collection';

  beforeEach(() => {
    lib = new PlatformBrowser({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        // firebase: {}
      },
      storage: { clear: () => {} } as StorageAdapter
    });
  });

  it('should be created using minimal setup', () => {
    const lib_ = new PlatformBrowser({});
    expect(lib_).toBeTruthy();
  });

  it('should fail if `useCache` true and no storage instance is available', () => {
    expect(() => {
      lib = new PlatformBrowser({
        useLog: false,
        baseURL: baseURL,
        collection: collection,
        connector: {
          // firebase: {}
        },
        chain: {
          useCache: true
        }
      });
    }).toThrowError('missing storage instance');
  });

  it('should implement `clearCache`', () => {
    const spy = jest.spyOn(PlatformBrowser.prototype, 'clearCache');
    lib.clearCache();
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT `feed` responses from cache into rr store', () => {
    Config.options.storage = null;

    const lib_ = new PlatformBrowser({
      useLog: false,
      baseURL: baseURL,
      collection: collection
    });

    const spy = jest.spyOn(Config.store.dispatch, 'next');

    lib_.feed();

    expect(spy).not.toBeCalled();
  });

  it('should `feed` responses from cache into rr store', () => {
    Config.options.storage = {
      forEach: (cb: any) => {
        const result = [
          { data: { a: 1 }, collection: collection, key: 'a1' },
          { data: { b: 2 }, collection: collection, key: 'b2' },
          { data: { c: 3 }, collection: 'foo', key: 'c3' }
        ];
        result.forEach((item, index) => {
          cb(item, item.key, index);
        });
      }
    } as StorageAdapter;

    const spy = jest.spyOn(Config.store.dispatch, 'next');

    lib.feed();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      collection: 'foo-collection',
      data: { a: 1 },
      key: 'a1'
    });
    expect(spy).toHaveBeenCalledWith({
      collection: 'foo-collection',
      data: { b: 2 },
      key: 'b2'
    });
    expect(spy).not.toHaveBeenCalledWith({
      collection: 'foo',
      data: { c: 3 },
      key: 'c3'
    });
  });
});
