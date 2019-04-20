import { FirebaseStub } from './stub';
import { FirebaseDriver } from './firebase';

describe('FirebaseDriver', () => {
  let driver: FirebaseDriver;
  const collection = 'foo-collection';
  let firebaseMock;

  beforeEach(() => {
    firebaseMock = FirebaseStub({});
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: collection,
      connector: {
        firebase: firebaseMock.firebase
      }
    });
  });

  it('should be created using minimal setup', () => {
    expect(driver).toBeTruthy();
  });

  it('should implement `find` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'find');
    driver.find({}, 'my-key').toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `findOne` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'findOne');
    driver.findOne({}, 'my-key').toPromise();
    expect(spy).toBeCalled();
  });

  it('should implement `on` method', () => {
    const spy = jest.spyOn(FirebaseDriver.prototype, 'on');
    driver.on({}, r => {}, err => {}, {}).toPromise();
    expect(spy).toBeCalled();
  });

  it('should fail on missing `collection` for [find] method', () => {
    driver = new FirebaseDriver({
      driver: 'firebase',
      connector: {
        firebase: FirebaseStub({}).firebase
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing collection'
    );
  });

  it('should fail on missing `connector` for [find] method', () => {
    driver = new FirebaseDriver({
      driver: 'firebase',
      collection: 'users',
      connector: {
        firebase: {}
      }
    });

    return expect(driver.find({}, 'my-key').toPromise()).rejects.toThrowError(
      'missing firebase connector'
    );
  });

  // fit('should return response for [find] method', () => {
  //   driver.find({}, 'my-key').toPromise();
  //   // expect(firebaseMock.onceCallback.mock.calls.length).toBe(2);
  // });
});
