import { FirestoreStub } from './stub';
import { FirestoreDriver } from './firestore';
import { ReactiveRecord } from '../platforms/server';
import { Logger } from '../utils/logger';
import { Subject } from 'rxjs';

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
    return {
      get: () => Promise.reject('find fail')
    };
  }
}

describe('FirestoreDriver', () => {
  let driver: FirestoreDriverMock, lib: ReactiveRecord;
  const collection = 'foo-collection';
  let firestoreMock;

  beforeEach(() => {
    firestoreMock = FirestoreStub({});
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      collection: collection,
      connector: {
        firestore: firestoreMock.firestore
      }
    });
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
  });

  it('should implement `find` method', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'find');
    driver.find({}, 'my-key').toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `findOne` method', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'findOne');
    driver.findOne({}, 'my-key').toPromise();
    driver.findOne({}, 'my-key', {}).toPromise();
    expect(spy).toBeCalledTimes(2);
  });

  it('should implement `on` method', () => {
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'on');
    driver.on({});
    driver.on({}, r => {}, err => {});
    driver.on({}, r => {}, err => {}, { transformResponse: r => r.data });
    expect(spy).toBeCalledTimes(3);
  });

  it('should fail on missing `collection` for [find] method', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      connector: {
        firebase: FirestoreStub({}).firestore
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing collection'
    );
  });

  it('should fail on missing `connector` for [find] method', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
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
    expect(spy).toBeCalled();
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
    expect(spy).toBeCalled();
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
    expect(spy).toBeCalled();
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
    expect(spy).toBeCalled();
  });

  it('should apply `limit`', () => {
    driver = new FirestoreDriverMock({
      driver: 'firestore',
      collection: collection,
      connector: {
        firestore: firestoreMock.firestore
      }
    });
    const spy = jest.spyOn(FirestoreDriverMock.prototype, 'limit');
    driver.limit(54, {
      limit: () => {}
    });
    expect(spy).toBeCalled();
  });

  // it('should apply the limit on `find` method', () => {
  //   driver = new FirestoreDriverMock({
  //     driver: 'firestore',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         collection: () => {},
  //         limit: () => {}
  //       }
  //     }
  //   });
  //   const spy = jest.spyOn(FirestoreDriverMock.prototype, 'limit');
  //   driver.find({ size: 999 }, 'my-key').toPromise();
  //   expect(spy).toBeCalled();
  // });

  // it('should fail on `find`', () => {
  //   driver = new FirestoreFailMock({
  //     driver: 'firestore',
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         collection: () => {}
  //       }
  //     }
  //   });

  //   expect(() => {
  //     driver.find({}, 'my-key');
  //   }).toThrowError(`sort object can't be null`);
  // });
});
