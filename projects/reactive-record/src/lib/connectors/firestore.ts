/**
 * initialize and return the firestore instance
 *
 * @export
 * @class RRFirestoreConnector
 */
export class RRFirestoreConnector {
  constructor(firebase, config) {
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    try {
      firebase.initializeApp(config);
    } catch (err) {
      if (!/already exists/.test(err.message))
        console.error('Firebase initialization error', err.stack);
    }
    if (!firebase.apps.length) {
      const firestore = firebase.default.firestore();
      firestore.settings(settings);
      return firestore;
    } else {
      const firestore = firebase.apps[0].firebase_.firestore();
      firestore.settings(settings);
      return firestore;
    }
  }
}

// @deprecated
export class FirestoreConnector extends RRFirestoreConnector {}
