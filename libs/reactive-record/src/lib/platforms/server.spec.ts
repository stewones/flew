import { ReactiveRecord } from './server';
import { FirestoreStub } from '../drivers/stub';
import { ReactiveDriverOption } from '../interfaces/driver';

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
});
