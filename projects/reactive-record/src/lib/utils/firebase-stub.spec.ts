import * as _ from 'lodash';

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
}: {
  signInEmail?: Promise<any>;
  signInCredential?: Promise<any>;
  createUser?: Promise<any>;
  signOut?: Promise<any>;
  resetPassword?: Promise<any>;
  updatePassword?: Promise<any>;
  updateProfile?: Promise<any>;
  facebookCredential?: Promise<any>;
  googleCredential?: Promise<any>;
}): {
  firebase: any;
  auth: any;
  signInWithEmailAndPassword: any;
  signInWithCredential: any;
  createUserWithEmailAndPassword: any;
  signOut: any;
  sendPasswordResetEmail: any;
  updatePassword: any;
  updateProfile: any;
  facebookCredential: any;
  googleCredential: any;
} => {
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

  const firebaseStub: any = {
    auth: firebaseAuthStub
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
