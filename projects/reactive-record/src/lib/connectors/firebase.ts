/**
 * initialize and return the firebase instance
 *
 * @export
 * @class RRFirebaseConnector
 */
export class RRFirebaseConnector {
  constructor(firebase, config) {
    try {
      firebase.initializeApp(config);
    } catch (err) {
      if (!/already exists/.test(err.message))
        console.error('Firebase initialization error', err.stack);
    }
    if (!firebase.apps.length) {
      return firebase.default;
    } else {
      return firebase.apps[0].firebase_;
    }
  }
}

// @deprecated
export class FirebaseConnector extends RRFirebaseConnector {}
