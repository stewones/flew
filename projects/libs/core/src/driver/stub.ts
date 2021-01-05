/* istanbul ignore file */

import * as _ from 'lodash';
import { Observable, of, throwError } from 'rxjs';

//
// Firebase Stub
export const FirebaseStub = ({
  signInEmail = Promise.resolve(true),
  signInCredential = Promise.resolve(true),
  createUser = Promise.resolve(true),
  signOut = Promise.resolve(true),
  resetPassword = Promise.resolve(true),
  updatePassword = Promise.resolve(true),
  updateProfile = Promise.resolve(true),
  facebookCredential = Promise.resolve(true),
  googleCredential = Promise.resolve(true)
}) => {
  const firebaseFacebookAuthProviderCredentialStub: any = jasmine
    .createSpy('credential')
    .and.returnValue(facebookCredential);
  const firebaseGoogleAuthProviderCredentialStub: any = jasmine
    .createSpy('credential')
    .and.returnValue(googleCredential);
  const firebaseSignInEmailStub: any = jasmine
    .createSpy('signInWithEmailAndPassword')
    .and.returnValue(signInEmail);
  const firebaseCreateUserStub: any = jasmine
    .createSpy('createUserWithEmailAndPassword')
    .and.returnValue(createUser);
  const firebaseSignOutStub: any = jasmine
    .createSpy('signOut')
    .and.returnValue(signOut);
  const firebaseResetPasswordStub: any = jasmine
    .createSpy('sendPasswordResetEmail')
    .and.returnValue(resetPassword);
  const firebaseUpdatePasswordStub: any = jasmine
    .createSpy('updatePassword')
    .and.returnValue(updatePassword);
  const firebaseUpdateProfileStub: any = jasmine
    .createSpy('updateProfile')
    .and.returnValue(updateProfile);
  const firebaseSignInCredentialStub: any = jasmine
    .createSpy('signInWithCredential')
    .and.returnValue(signInCredential);

  const firebaseAuthStub: any = jasmine.createSpy('auth').and.returnValue({
    signInWithEmailAndPassword: firebaseSignInEmailStub,
    createUserWithEmailAndPassword: firebaseCreateUserStub,
    signOut: firebaseSignOutStub,
    sendPasswordResetEmail: firebaseResetPasswordStub,
    signInWithCredential: firebaseSignInCredentialStub,
    currentUser: {
      updatePassword: firebaseUpdatePasswordStub,
      updateProfile: firebaseUpdateProfileStub
    }
  });

  const firebaseRefStub: any = jasmine.createSpy('ref').and.returnValue({
    once: (
      type = 'value',
      callback = (snapshot: any) => {
        return of({
          data: [{ a: 1 }, { b: 2 }, { c: 3 }],
          key: 'mocked-key',
          collection: 'mocked-collection',
          from: 'mocked-driver',
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
      error('zzz');
    },
    on: (
      type = 'value',
      callback = (snapshot: any) => {
        return of({
          data: [{ a: 1 }, { b: 2 }, { c: 3 }],
          key: 'mocked-key',
          collection: 'mocked-collection',
          from: 'mocked-driver',
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
      error('zzz');
    }
  });

  const firebaseDbStub: any = jasmine.createSpy('database').and.returnValue({
    ref: firebaseRefStub
  });

  const firebaseStub: any = {
    auth: firebaseAuthStub,
    database: firebaseDbStub,
    ref: () => {
      return {
        on: () => {}
      };
    }
  };

  _.extend(firebaseStub.auth, {
    FacebookAuthProvider: {
      credential: firebaseFacebookAuthProviderCredentialStub
    },
    GoogleAuthProvider: {
      credential: firebaseGoogleAuthProviderCredentialStub
    }
  });

  return {
    firebase: firebaseStub,
    auth: firebaseAuthStub,
    signInWithEmailAndPassword: firebaseSignInEmailStub,
    signInWithCredential: firebaseSignInCredentialStub,
    createUserWithEmailAndPassword: firebaseCreateUserStub,
    signOut: firebaseSignOutStub,
    sendPasswordResetEmail: firebaseResetPasswordStub,
    updatePassword: firebaseUpdatePasswordStub,
    updateProfile: firebaseUpdateProfileStub,
    facebookCredential: firebaseFacebookAuthProviderCredentialStub,
    googleCredential: firebaseGoogleAuthProviderCredentialStub
  };
};

//
// Firestore Stub
export const FirestoreStub = ({
  get = Promise.resolve([
    {
      data: () => {
        return { foo: 'data' };
      }
    }
  ]),
  set = Promise.resolve(true),
  update = Promise.resolve(true),
  onSnapshot = (successFn, errorFn) => {}
}: {
  get?: Promise<any>;
  set?: Promise<any>;
  update?: Promise<any>;
  onSnapshot?: any;
}): {
  firestore: any;
  collection: any;
  doc: any;
  get: any;
  set: any;
  update: any;
  onSnapshot: any;
} => {
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

  const firestoreStub: any = {
    collection: firestoreCollectionStub
  };

  return {
    firestore: firestoreStub,
    collection: firestoreCollectionStub,
    doc: firestoreCollectionDocStub,
    get: firestoreCollectionDocGetStub,
    set: firestoreCollectionDocSetStub,
    update: firestoreCollectionDocUpdateStub,
    onSnapshot: firestoreCollectionDocOnStub
  };
};
