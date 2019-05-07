import { PlatformBrowser } from './browser';

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
      }
    });
  });

  it('should be created using minimal setup', () => {
    const lib_ = new PlatformBrowser({});
    expect(lib_).toBeTruthy();
  });
});
