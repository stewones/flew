import { ReactiveRecord } from './server';
import { FirestoreStub } from '../drivers/stub';
import { ReactiveDriverOption } from '../interfaces/driver';
import { Logger } from '../utils/logger';
import { Subject, Observable } from 'rxjs';
import { ReactiveVerb } from '../interfaces/verb';
import { RR_DRIVER } from '../driver';

class ReactiveRecordMock extends ReactiveRecord {
  constructor(options) {
    super(options);
  }

  public createKey(path = '', body = {}): string {
    return super.createKey(path, body);
  }

  public call$(
    method: ReactiveVerb,
    path: string = '',
    payload: any = {},
    chain = this.cloneChain(),
    key: string = ''
  ) {
    return super.call(method, path, payload, chain, key);
  }

  public cloneChain() {
    return super.cloneChain();
  }
}

describe('ReactiveRecord', () => {
  let lib: ReactiveRecord;
  const baseURL = 'http://firetask.dev';
  const collection = 'foo-collection';

  beforeEach(() => {
    const firestoreStub = FirestoreStub({
      get: Promise.resolve({
        forEach: () => {}
      }),
      set: Promise.resolve(true),
      update: Promise.resolve(true),
      onSnapshot: (success, error) => {
        console.log(123, success);
      }
    });

    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: firestoreStub,
        firebase: { _: 'instance' }
      }
    });
  });

  it('should be created using minimal setup', () => {
    lib = new ReactiveRecord({});
    expect(lib).toBeTruthy();
  });

  it('should initialise with cache disabled', () => {
    lib = new ReactiveRecord({ useCache: false });
    expect(lib).toBeTruthy();
    //
    // and/or
    lib.init({ chain: { useCache: false } });
    expect(lib).toBeTruthy();
  });

  it('should initialise with logs disabled', () => {
    lib = new ReactiveRecord({});
    lib.init({ useLog: false, useLogTrace: false });
    expect(lib).toBeTruthy();
  });

  it('should fail for unknown drivers', () => {
    expect(() => {
      lib
        .driver('unknown' as ReactiveDriverOption)
        .find()
        .toPromise();
    }).toThrowError('[find] method unavailable for driver [unknown]');
  });

  it('should implement `find` method', () => {
    const spy = jest.spyOn(ReactiveRecord.prototype, 'find');
    lib.find().toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `findOne` method', () => {
    const spy = jest.spyOn(ReactiveRecord.prototype, 'findOne');
    lib.findOne().toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `set` method', () => {
    const spy = jest.spyOn(ReactiveRecord.prototype, 'set');
    lib.set('some_id', { some: 'data' }).toPromise();
    expect(spy).toBeCalled();

    lib.set('some_id', { some: 'data' }, false).toPromise();

    expect(spy).toBeCalledWith('some_id', { some: 'data' }, false);
  });

  it('should implement `update` method', () => {
    const spy = jest.spyOn(ReactiveRecord.prototype, 'update');
    lib.update('some_id', { some: 'data' }).toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `on` method', () => {
    const spy = jest.spyOn(ReactiveRecord.prototype, 'on');
    lib.on(r => {}, r => {});
    expect(spy).toBeCalled();
  });

  it('should return `firebase` connector instance', () => {
    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: { _: 'firestore instance' },
        firebase: { _: 'firebase instance' }
      }
    });
    expect(lib.firebase()).toEqual({ _: 'firebase instance' });
  });

  it('should return `firestore` connector instance', () => {
    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: { _: 'firestore instance' },
        firebase: { _: 'firebase instance' }
      }
    });
    expect(lib.firestore()).toEqual({ _: 'firestore instance' });
  });

  it('should return `storage` adapter', () => {
    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection
    });
    lib.init({ storage: { _: 'adapter' } } as any);
    expect(lib.cache()).toEqual({ _: 'adapter' });
  });

  it('should clear cache', () => {
    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection
    });

    const spy = jest.spyOn(ReactiveRecord.prototype, 'clearCache');
    lib.init({ storage: { _: 'adapter' } } as any);
    lib.clearCache();

    expect(spy).toBeCalled();
  });

  it('should feed collections', () => {
    lib = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection
    });

    const spy = jest.spyOn(ReactiveRecord.prototype, 'feed');
    lib.init();
    lib.feed();

    expect(spy).toBeCalled();
  });

  it('should not reinitialise drivers', () => {
    const lib_ = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        http: { _: 'http instance' },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });
    const spy = jest.spyOn(ReactiveRecord.prototype, 'driverInit' as any);

    lib_.firebase();
    lib_.firebase();
    lib_.firebase();

    expect(spy).toBeCalledTimes(1);
  });

  it('should initialise with `firestore` as a default driver', () => {
    const lib_ = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        http: { _: 'http instance' },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });
    lib_.init({ driver: '' } as any);
    expect(lib_.driver()).toEqual('firestore');
  });

  it('should fail when verbs and drivers does not match', () => {
    const lib_ = new ReactiveRecord({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        http: { _: 'http instance' },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });

    lib_.init();

    expect(() => {
      lib_.driver('http').on(() => {}, () => {});
    }).toThrowError('[on] method unavailable for driver [http]');
  });

  it('should use log', () => {
    lib.init({
      logger: new Logger({
        subject: new Subject(),
        useLog: false,
        useLogTrace: false
      })
    } as any);

    expect(lib.useLog(false)).toBeInstanceOf(ReactiveRecord);
    expect(lib.useLogTrace(true)).toBeInstanceOf(ReactiveRecord);
  });

  it('should create unique keys', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      endpoint: '/',
      connector: {
        http: { _: 'http instance' },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });
    lib_.init();
    expect(lib_.createKey()).toEqual(
      'foo-collection://ea8b4f22422ed792a368b06eac1d76b7e9f0aa4e748f9c3b2c22272b08fe5a97'
    );
    expect(lib_.createKey('path/to/data/source', { a: 1, b: 2, c: 3 })).toEqual(
      'foo-collection://path/to/data/source/963fb7e4d7ae819f353bcde470c2d148aa4b224a75e39722ad3bded6f031ae11'
    );

    lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      // collection: collection, // with no collection
      connector: {
        http: { _: 'http instance' },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });
    lib_.init();

    expect(lib_.createKey('path/to/data/source', { a: 1, b: 2, c: 3 })).toEqual(
      'rr://path/to/data/source/963fb7e4d7ae819f353bcde470c2d148aa4b224a75e39722ad3bded6f031ae11'
    );
  });

  it('should implement [get] verb', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { get: () => Promise.resolve([1, 2, 3]) }
      }
    });
    const spy = jest.spyOn(ReactiveRecord.prototype, 'get');
    lib_
      .get()
      .toPromise()
      .then(r =>
        expect(r).toEqual({
          collection: 'foo-collection',
          data: [1, 2, 3],
          driver: 'http',
          key:
            'foo-collection://b3237131a345ad672e85d73fdc566a5c42c30371ecc776714991d2e960599185',
          response: [1, 2, 3]
        })
      );
    lib_.get('').toPromise();
    expect(spy).toBeCalledTimes(2);
  });

  it('should implement [post] verb', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { post: () => Promise.resolve([1, 2, 3]) }
      }
    });
    const spy = jest.spyOn(ReactiveRecord.prototype, 'post');
    lib_
      .post()
      .toPromise()
      .then(r =>
        expect(r).toEqual({
          collection: 'foo-collection',
          data: [1, 2, 3],
          driver: 'http',
          key:
            'foo-collection://b3237131a345ad672e85d73fdc566a5c42c30371ecc776714991d2e960599185',
          response: [1, 2, 3]
        })
      );
    lib_.post('').toPromise();
    lib_.post('', { a: 1, b: 2, c: 3 }).toPromise();
    expect(spy).toBeCalledTimes(3);
  });

  it('should implement [patch] verb', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { patch: () => Promise.resolve([1, 2, 3]) }
      }
    });
    const spy = jest.spyOn(ReactiveRecord.prototype, 'patch');
    lib_
      .patch()
      .toPromise()
      .then(r =>
        expect(r).toEqual({
          collection: 'foo-collection',
          data: [1, 2, 3],
          driver: 'http',
          key:
            'foo-collection://b3237131a345ad672e85d73fdc566a5c42c30371ecc776714991d2e960599185',
          response: [1, 2, 3]
        })
      );
    lib_.patch('').toPromise();
    lib_.patch('', { a: 1, b: 2, c: 3 }).toPromise();
    expect(spy).toBeCalledTimes(3);
  });

  it('should implement [delete] verb', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { delete: () => Promise.resolve([1, 2, 3]) }
      }
    });
    const spy = jest.spyOn(ReactiveRecord.prototype, 'delete');
    lib_
      .delete()
      .toPromise()
      .then(r =>
        expect(r).toEqual({
          collection: 'foo-collection',
          data: [1, 2, 3],
          driver: 'http',
          key:
            'foo-collection://b3237131a345ad672e85d73fdc566a5c42c30371ecc776714991d2e960599185',
          response: [1, 2, 3]
        })
      );
    lib_.delete('').toPromise();
    lib_.delete('', { a: 1, b: 2, c: 3 }).toPromise();
    expect(spy).toBeCalledTimes(3);
  });

  it('should implement [http] chaining', () => {
    expect(
      lib.http(config => (config.headers['token'] = 'a1b2c3'))
    ).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [useNetwork] chaining', () => {
    expect(lib.useNetwork(true)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [saveNetwork] chaining', () => {
    expect(lib.saveNetwork(false)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [transformResponse] chaining', () => {
    expect(lib.transformResponse(r => r.data)).toBeInstanceOf(ReactiveRecord);
  });

  // @todo scheduled to remove in favor of `transformResponse`
  it('should implement [transformNetwork] chaining', () => {
    expect(lib.transformNetwork(r => r.data)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [ttl] chaining', () => {
    expect(
      lib.ttl(60) // in seconds
    ).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [transformCache] chaining', () => {
    expect(lib.transformCache(r => r.data)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [key] chaining', () => {
    expect(lib.key('yo!')).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [query] chaining', () => {
    expect(
      lib.query([{ field: 'uid', operator: '==', value: 'a1b2c3' }])
    ).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [where] chaining', () => {
    expect(lib.where('uid', '==', 'a1b2c3')).toBeInstanceOf(ReactiveRecord);

    const lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: {
          where: () => {},
          collection: () => {
            return {
              where: () => {
                return {
                  where: () => {
                    return {
                      get: () =>
                        Promise.resolve([
                          {
                            data: () => {
                              return { a: 1, b: 2, c: 3 };
                            }
                          }
                        ])
                    };
                  }
                };
              }
            };
          }
        },
        firebase: { _: 'instance' }
      }
    });

    const request = lib_
      .query([{ field: 'a', operator: 'b', value: 'c' }])
      .where('uid', '==', 'a1b2c3');

    expect(request).toBeInstanceOf(ReactiveRecord);

    const spy = jest.spyOn(ReactiveRecord.prototype, 'call' as any);

    const chain = lib_.cloneChain();

    expect(chain).toEqual({
      query: [
        { field: 'a', operator: 'b', value: 'c' },
        { field: 'uid', operator: '==', value: 'a1b2c3' }
      ]
    });

    request.find().toPromise();
    expect(spy).toBeCalledWith('find');
  });

  it('should implement [sort] chaining', () => {
    expect(lib.sort({ created_at: 'desc' })).toBeInstanceOf(ReactiveRecord);
    lib.reboot();
    expect(
      lib.sort({ created_at: 'desc' }).sort({ updated_at: 'desc' })
    ).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [size] chaining', () => {
    expect(lib.size(54)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [ref] chaining', () => {
    expect(lib.ref('path/to/firebase/ref')).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [data] chaining', () => {
    expect(lib.data(true)).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [doc] chaining', () => {
    expect(lib.doc('a1b2c3')).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [reset] chaining', () => {
    expect(lib.reset()).toBeInstanceOf(ReactiveRecord);
  });

  it('should implement [reboot] chaining', () => {
    lib.init({ driver: 'firebase' });
    lib.reboot();
    expect(lib.driver()).toEqual(RR_DRIVER);
  });

  it('should call network with a customized key', () => {
    let lib_ = new ReactiveRecordMock({
      useLog: false,
      baseURL: baseURL,
      endpoint: '/',
      collection: collection,
      connector: {
        http: { post: () => Promise.resolve([1, 2, 3]) },
        firebase: { _: 'firebase instance' },
        firestore: { _: 'firestore instance' }
      }
    });

    lib_
      .call$('post', 'path/to/data/source', {}, {}, 'my-custom-key')
      .toPromise();
  });
});
