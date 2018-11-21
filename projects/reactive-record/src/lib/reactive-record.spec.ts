import { ReactiveRecord } from './reactive-record';
import { fakeAsync, tick } from '@angular/core/testing';

import { FirestoreStub } from './utils/firestore-stub.spec';
import { PartialObserver } from 'rxjs';

describe('ReactiveRecord', () => {
  let lib: ReactiveRecord,
    hookStub,
    exceptionServerStub,
    exceptionClientStub,
    baseURL = 'http://127.0.0.1',
    collection = 'foo-collection';

  beforeEach(() => {});

  it('should be created using minimal setup', () => {
    lib = new ReactiveRecord({
      baseURL: baseURL
    });
    expect(lib).toBeTruthy();
  });

  // it('must have a baseURL for http calls', () => {
  //   lib = new ReactiveRecord({ driver: 'elastic' });
  //   lib.findOne({}).subscribe(null, err => expect(err).toEqual('baseURL needed for elastic'));
  // });

  // it('must have a collection for firebase to use the find', () => {
  //   lib = new ReactiveRecord({
  //     baseURL: baseURL
  //   });
  //   lib.find({}, null, 'firebase').subscribe(r => { }, err => {
  //     expect(err).toEqual('missing collection')
  //   });
  // });

  it('must have a collection for firestore to use the find', () => {
    lib = new ReactiveRecord({
      baseURL: baseURL
    });
    lib.find().subscribe(
      r => {},
      err => {
        expect(err).toEqual('missing collection');
      }
    );
  });

  // it('must have a firebase connector', () => {
  //   lib = new ReactiveRecord({
  //     baseURL: baseURL,
  //     collection: collection
  //   });
  //   lib.find({}, null, 'firebase').subscribe(r => { }, err => {
  //     expect(err).toEqual('firebase driver unavailable for now, sorry =(')
  //   });
  // });

  it('must have a firestore connector', () => {
    lib = new ReactiveRecord({
      baseURL: baseURL,
      collection: collection
    });
    lib.find().subscribe(
      r => {},
      err => {
        expect(err).toEqual('missing firestore connector');
      }
    );
    // cover else path
    lib = new ReactiveRecord({
      baseURL: baseURL,
      collection: collection,
      connector: {
        firestore: {
          loaded: true
        }
      }
    });
    lib.find().subscribe();
  });

  // it('should run the hook `find.before` for firestore driver', () => {
  //   const firestoreStub = FirestoreStub({});

  //   spyOnProperty(ReactiveRecord.prototype, 'connector', 'get').and.returnValue({
  //     firestore: {
  //       collection: firestoreStub.collection
  //     }
  //   });
  //   lib = new ReactiveRecord({
  //     baseURL: baseURL,
  //     collection: collection,
  //     connector: {
  //       firestore: {
  //         loaded: true
  //       }
  //     },
  //     hook: {
  //       find: {
  //         before: (key, observer, RRExtraOptions) => Promise.resolve(true)
  //       }
  //     }
  //   });
  //   const key: string = `${lib.collection}/${JSON.stringify({})}`;
  //   spyOn(ReactiveRecord.prototype, 'runHook');
  //   lib.find({}, null, 'firestore').subscribe(r => {
  //     expect(ReactiveRecord.prototype.runHook).toHaveBeenCalledWith('find.before', key, lib._observer, null);
  //   }, console.log);
  // });
});
