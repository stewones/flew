import { ReactiveRecord } from './server';
import { FirestoreStub } from '../utils/firestore-stub';
// import { fakeAsync, tick } from '@angular/core/testing';

describe('ReactiveRecord', () => {
  let lib: ReactiveRecord;
  // hookStub,
  // exceptionServerStub,
  // exceptionClientStub,
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
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: firestoreStub
        // firebase: {}
      }
    });
  });

  it('should be created using minimal setup', () => {
    const lib_ = new ReactiveRecord({});
    expect(lib_).toBeTruthy();
  });

  it('should fail for unknown drivers', () => {
    expect(() => {
      lib
        .driver('unknown')
        .find()
        .toPromise();
    }).toThrowError('unknown driver unavailable for method [find]');
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
    lib
      .update('some_id', { some: 'data' })
      .toPromise()
      .then(r => console.log(r));
    expect(spy).toBeCalled();
  });

  fit('should implement `on` method', () => {
    // const spy = jest.spyOn(ReactiveRecord.prototype, 'on');
    lib.on(
      r => {
        console.log(123, r);
      },
      r => console.log(r)
    );
    // expect(spy).toBeCalled();
  });
});
