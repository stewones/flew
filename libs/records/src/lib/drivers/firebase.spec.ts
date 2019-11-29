import { FirebaseDriver } from './firebase';
import { Logger } from '../utils/logger';
import { Subject, of, throwError } from 'rxjs';
import { Reative } from '../symbols/reative';

class FirebaseDriverMock extends FirebaseDriver {
  logger = new Logger({
    subject: new Subject(),
    silent: true
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
    Reative.connector = {
      firebase: firebaseStub
    };
    driver = new FirebaseDriverMock({
      collection: collection
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

  it('should fail on missing `collection` for [find] method', async () => {
    let thrownError;
    Reative.connector = {
      firebase: firebaseStub
    };

    driver = new FirebaseDriver({
      driver: 'firebase'
    });

    try {
      await driver.find({}, 'my-key').toPromise();
    } catch (err) {
      thrownError = err;
    }

    return expect(thrownError).toEqual(new Error('missing collection'));
  });

  it('should fail on missing `database` for [find] method', async () => {
    let thrownError;
    Reative.connector = {};
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: 'users'
    });
    try {
      await driver.find({}, 'my-key').toPromise();
    } catch (err) {
      thrownError = err;
    }
    return expect(thrownError).toEqual(
      new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      )
    );
  });

  it('should fail on missing `connector` for [find] method', async () => {
    Reative.connector = {};

    let thrownError;
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: 'users'
    });

    try {
      await driver.find({}, 'my-key').toPromise();
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toEqual(
      new Error(
        `missing database instance. did you add import 'firebase/database'; to your environment file?`
      )
    );
  });

  it('should return a logger instance', () => {
    return expect(driver.log()).toBeTruthy();
  });
});
