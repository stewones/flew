import { FirestoreDriver } from './firestore';
import { Records } from '../platforms/server';
import { Logger } from '../utils/logger';
import { Subject, of, throwError } from 'rxjs';
import { Response } from '../interfaces/response';
import { Chain } from '../interfaces/chain';
class FirestoreDriverMock extends FirestoreDriver {
  logger = new Logger({
    subject: new Subject(),
    useLog: false,
    useLogTrace: false
  });

  constructor(options) {
    super(options);
  }

  public where(query, firestore) {
    return super.where(query, firestore);
  }

  public order(sort, firestore) {
    return super.order(sort, firestore);
  }

  public limit(
    limit,
    firestore = {
      limit: () => {
        get: () => Promise.resolve();
      }
    }
  ) {
    return super.limit(limit, firestore);
  }

  public on(chain: Chain = {}, key: string = ''): any {
    return super.on(chain, key);
  }
}

class FirestoreFailMock extends FirestoreDriver {
  logger = new Logger({
    subject: new Subject(),
    useLog: false,
    useLogTrace: false
  });

  constructor(options) {
    super(options);
  }

  public where(query, firestore) {
    return super.where(query, firestore);
  }

  public limit(limit, firestore) {
    return super.limit(limit, firestore);
  }

  //
  // fail
  public order(sort, firestore) {
    return super.order(sort, firestore);
  }
}
const get = Promise.resolve([
  {
    data: () => {
      return { foo: 'data' };
    }
  }
]);
const set = Promise.resolve(true);
const update = Promise.resolve(true);
const onSnapshot = (successFn, errorFn) => {};

const firestoreCollectionDocGetStub: any = jasmine
  .createSpy('get')
  .and.returnValue(get);

const firestoreCollectionDocSetStub: any = jasmine
  .createSpy('set')
  .and.returnValue(set);

const firestoreCollectionDocUpdateStub: any = jasmine
  .createSpy('update')
  .and.returnValue(update);

const firestoreCollectionDocOnStub: any = jasmine
  .createSpy('onSnapshot')
  .and.returnValue(onSnapshot);

const firestoreCollectionDocStub: any = jasmine
  .createSpy('doc')
  .and.returnValue({
    get: firestoreCollectionDocGetStub,
    set: firestoreCollectionDocSetStub,
    update: firestoreCollectionDocUpdateStub,
    onSnapshot: firestoreCollectionDocOnStub
  });

const firestoreCollectionStub: any = jasmine
  .createSpy('collection')
  .and.returnValue({
    doc: firestoreCollectionDocStub,
    get: firestoreCollectionDocGetStub,
    onSnapshot: firestoreCollectionDocOnStub
  });

export const firestoreStub: any = {
  collection: firestoreCollectionStub
};

describe('FirestoreDriver', () => {
  let driver: FirestoreDriverMock, lib: Records;
  const collection = 'foo-collection';

  beforeEach(() => {
    driver = new FirestoreDriverMock({
      collection: collection,
      connector: {
        firestore: firestoreStub
      }
    });
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
    driver = new FirestoreDriverMock({
      chain: {
        useCache: false
      }
    });
    expect(driver).toBeTruthy();
  });

  it('should implement `find` method', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'find');
    driver.find({}, 'my-key').toPromise();
    expect(spy).toHaveBeenCalled();
  });

  it('should implement `findOne` method', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'findOne');
    driver.findOne({}, 'my-key').toPromise();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should implement `on` method', () => {
    const onSnapshot = fn => {
      const snapshot = {
        forEach: fn => {
          return fn({
            data: () => {
              return { data: { a: 1, b: 2, c: 3 } };
            }
          });
        }
      };
      fn(snapshot);
    };

    const driver_ = new FirestoreDriverMock({
      logger: new Logger({
        subject: new Subject(),
        useLog: false,
        useLogTrace: false
      }),
      collection: 'users',
      connector: {
        firestore: {
          collection: () => {
            return {
              doc: () => {},
              onSnapshot: onSnapshot,
              where: () => {},
              order: () => {
                return {
                  onSnapshot: onSnapshot
                };
              },
              limit: () => {
                return {
                  onSnapshot: onSnapshot
                };
              }
            };
          },
          limit: () => false
        }
      }
    } as any);
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'on');
    driver_.on({});
    driver_.on({
      transformResponse: r => r.data
    });
    driver_.on({ doc: 'asdf', size: 54 });

    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should fail for `on` method', () => {
    const onSnapshotFail = (fn1, fn2) => {
      return fn2('on failed');
    };
    const driver_ = new FirestoreDriver({
      collection: 'users',
      connector: {
        firestore: {
          collection: () => {
            return {
              doc: () => {},
              onSnapshot: onSnapshotFail,
              where: () => {},
              order: () => {
                return {
                  onSnapshot: onSnapshotFail
                };
              },
              limit: () => {
                return {
                  onSnapshot: onSnapshotFail
                };
              }
            };
          },
          limit: () => false
        }
      }
    });

    driver_.on({}, '');
  });

  it('should fail on missing `collection` for [find] method', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      connector: {
        firestore: firestoreStub
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing collection'
    );
  });

  it('should fail on missing `connector` for [find] method', () => {
    driver = new FirestoreDriverMock({
      collection: 'users',
      connector: {
        firestore: {}
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing firestore connector'
    );
  });

  it('should apply `where` using array', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'where');
    driver.where([{ field: 'uid', operator: '==', value: 'a1b2c3' }], {
      where: () => {}
    });
    expect(spy).toHaveBeenCalled();
    expect(() => {
      driver.where([{ field: 'uid', operator: '==', value: null }], {
        where: () => {}
      });
    }).toThrowError(`value can't be null for firestore where`);
  });

  it('should apply `where` using object', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'where');
    driver.where(
      { field: 'uid', operator: '==', value: 'a1b2c3' },
      {
        where: () => {}
      }
    );
    expect(spy).toHaveBeenCalled();
    expect(() => {
      driver.where(
        { field: 'uid', operator: '==', value: null },
        {
          where: () => {}
        }
      );
    }).toThrowError(`value can't be null for firestore where`);
  });

  it('should apply `order` using array', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'order');
    driver.order([{ updated_at: 'desc' }], { orderBy: () => {} });
    expect(spy).toHaveBeenCalled();
    expect(() => {
      driver.order([{}], {
        orderBy: () => {
          return { orderBy: () => {} };
        }
      });
    }).toThrowError(`sort object in array can't be null`);
  });

  it('should apply `order` using object', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'order');
    driver.order(
      { updated_at: 'desc', created_at: 'asc' },
      {
        orderBy: () => {
          return { orderBy: () => {} };
        }
      }
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should apply `limit`', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      collection: collection,
      connector: {
        firestore: firestoreStub
      }
    });
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'limit');
    driver.limit(54, {
      limit: () => {}
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should apply the limit on `find` method', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      collection: collection,
      connector: {
        firestore: {
          collection: () => {
            return {
              where: () => {},
              limit: () => {
                return {
                  get: () =>
                    Promise.resolve({
                      forEach: () => {}
                    })
                };
              }
            };
          },
          limit: () => false
        }
      }
    });
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'limit');
    driver.find({ size: 999 }, 'my-key').toPromise();
    expect(spy).toHaveBeenCalled();
  });

  it('should fail on `sort`', () => {
    driver = new FirestoreFailMock({
      driver: 'firestore',
      collection: collection,
      connector: {
        firestore: {
          collection: () => {}
        }
      },
      chain: { a: 123 }
    });

    expect(() => {
      driver.order({}, { orderBy: () => {} });
    }).toThrowError(`sort object can't be null`);
  });

  it('should fail on `find`', () => {
    driver = new FirestoreDriverMock({
      collection: collection,
      connector: {
        firestore: {
          collection: () => {
            return {
              where: () => {},
              order: () => {},
              limit: () => {
                return {
                  get: () => Promise.reject('find failed')
                };
              }
            };
          },
          limit: () => false
        }
      }
    });
    driver
      .find({ size: 54 }, 'my-key')
      .toPromise()
      .catch(err => expect(err).toBe('find failed'));
  });

  it('should `set`', () => {
    const spy = jest.spyOn(FirestoreDriver.prototype, 'set');
    const driver_ = new FirestoreDriver({
      collection: collection,
      connector: {
        firestore: {
          collection: () => {
            return {
              doc: () => {
                return {
                  set: () => {
                    return Promise.resolve();
                  }
                };
              }
            };
          },
          limit: () => false
        }
      }
    });
    driver_.set('a1b2c3', { lol: 123 }).toPromise();
    expect(spy).toHaveBeenCalled();
  });

  it('should fail on `set`', () => {
    const driver_ = new FirestoreDriver({
      collection: collection,
      connector: {
        firestore: {
          collection: () => {
            return {
              doc: () => {
                return {
                  set: () => {
                    return Promise.reject('set failed');
                  }
                };
              }
            };
          },
          limit: () => false
        }
      }
    });
    driver_
      .set('a1b2c3', { lol: 123 })
      .toPromise()
      .catch(err => {
        expect(err).toBe(`set failed`);
      });
  });

  it('should NOT apply `timestamp`', () => {
    const driver_ = new FirestoreDriver({
      timestamp: false,
      collection: collection,
      connector: {
        firestore: {
          collection: () => {
            return {
              doc: () => {
                return {
                  update: () => Promise.resolve()
                };
              }
            };
          },
          limit: () => false
        }
      }
    });
    driver_
      .update('a1b2c3', {})
      .toPromise()
      .then(r => expect(r).toEqual({}));
  });
});
