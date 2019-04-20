import { FirestoreStub } from './stub';
import { FirestoreDriver } from './firestore';
import { ReactiveRecord } from '../platforms/server';
import { Logger } from '../utils/logger';
import { Subject } from 'rxjs';

class FirestoreDriverMock extends FirestoreDriver {
  protected _logger = new Logger({
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

    lib = new ReactiveRecord({
      useLog: false,
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
});
