import { FirebaseDriver } from './firebase';
import { Logger } from '../utils/logger';
import { Subject, Observable, of, throwError } from 'rxjs';

class FirebaseDriverMock extends FirebaseDriver {
  logger = new Logger({
    subject: new Subject(),
    useLog: false,
    useLogTrace: false
  });

  constructor(options) {
    super(options);
  }
}

export const firebaseStub = {
  database: () => {
    return {
      ref: data => {
        return {
          on: (
            type = 'value',
            callback = (snapshot: any) => {
              return of({
                data: [{ a: 1 }, { b: 2 }, { c: 3 }],
                key: 'mocked-key',
                collection: 'mocked-collection',
                driver: 'mocked-driver',
                response: {}
              });
            },
            error = (err: any) => {
              return throwError(err);
            }
          ) => {
            callback({
              key: 'firebase-key',
              val: () => {
                return { a: 1, b: 2, c: 3 };
              },
              exists: () => true,
              numChildren: () => 1
            });
            // error('zzz');
          },
          once: (
            type = 'value',
            callback = (snapshot: any) => {
              return of({
                data: [{ a: 1 }, { b: 2 }, { c: 3 }],
                key: 'mocked-key',
                collection: 'mocked-collection',
                driver: 'mocked-driver',
                response: {}
              });
            },
            error = (err: any) => {
              return throwError(err);
            }
          ) => {
            callback({
              key: 'firebase-key',
              toJSON: () => {
                return { a: 1, b: 2, c: 3 };
              }
            });
            // error('zzz');
          }
        };
      }
    };
  }
};

describe('FirebaseDriver', () => {
  let driver: FirebaseDriver;
  const collection = 'foo-collection';

  beforeEach(() => {
    driver = new FirebaseDriverMock({
      collection: collection,
      connector: {
        firebase: firebaseStub
      }
    });
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
    driver = new FirebaseDriverMock({});
    expect(driver).toBeTruthy();
  });

  it('should implement `find` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'find');
    driver.find({}, 'my-key').toPromise();
    expect(spy).toHaveBeenCalled();
  });

  it('should implement `findOne` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'findOne');
    driver.findOne({}, 'my-key').toPromise();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should implement `on` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'on');
    driver.on({ transformResponse: r => r.data }, 'some-key');
    driver.on({ transformResponse: r => r.data }, 'some-key');
    driver.on({ transformResponse: r => r.data }, 'some-key');

    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should fail on missing `collection` for [find] method', () => {
    driver = new FirebaseDriver({
      driver: 'firebase',
      connector: {
        firebase: firebaseStub
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing collection'
    );
  });

  it('should fail on missing `database` for [find] method', () => {
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: 'users',
      connector: {}
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      `missing database instance. did you add import 'firebase/database'; to your environment file?`
    );
  });

  it('should fail on missing `connector` for [find] method', () => {
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: 'users',
      connector: {}
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      `missing database instance. did you add import 'firebase/database'; to your environment file?`
    );
  });

  it('should return a logger instance', () => {
    return expect(driver.log()).toBeTruthy();
  });
});
