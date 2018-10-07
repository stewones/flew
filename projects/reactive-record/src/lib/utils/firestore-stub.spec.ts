import * as _ from 'lodash';

//
// Firestore Stub
export const FirestoreStub = ({
    get = Promise.resolve([{
        data: () => { return { foo: 'data' } }
    }]),
    set = Promise.resolve(true),
    update = Promise.resolve(true)
}: {
        get?: Promise<any>,
        set?: Promise<any>,
        update?: Promise<any>,
    }): {
        firestore: any,
        collection: any,
        doc: any,
        get: any,
        set: any,
        update: any
    } => {
    const firestoreCollectionDocGetStub: any = jasmine.createSpy('get').and.returnValue(get);

    const firestoreCollectionDocSetStub: any = jasmine.createSpy('set').and.returnValue(set);

    const firestoreCollectionDocUpdateStub: any = jasmine.createSpy('update').and.returnValue(update);

    const firestoreCollectionDocStub: any = jasmine.createSpy('doc').and.returnValue({
        get: firestoreCollectionDocGetStub,
        set: firestoreCollectionDocSetStub,
        update: firestoreCollectionDocUpdateStub
    });

    const firestoreCollectionStub: any = jasmine.createSpy('collection').and.returnValue({
        doc: firestoreCollectionDocStub,
        get: firestoreCollectionDocGetStub
    });

    const firestoreStub: any = {
        collection: firestoreCollectionStub
    };

    return {
        firestore: firestoreStub,
        collection: firestoreCollectionStub,
        doc: firestoreCollectionDocStub,
        get: firestoreCollectionDocGetStub,
        set: firestoreCollectionDocSetStub,
        update: firestoreCollectionDocUpdateStub
    };
}