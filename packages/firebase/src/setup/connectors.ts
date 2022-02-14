/**
 * Firebase initializer
 *
 * @export
 * @class FirebaseConnector
 */
export class FirebaseConnector {
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

/**
 * Firestore initializer
 *
 * @export
 * @class FirestoreConnector
 */
export class FirestoreConnector {
  constructor(firebase, config, namespace = '') {
    try {
      if (namespace) {
        firebase.initializeApp(config, namespace);
      } else {
        firebase.initializeApp(config);
      }
    } catch (err) {
      if (!/already exists/.test(err.message))
        console.error('Firebase initialization error', err.stack);
    }

    let app;

    if (namespace) {
      app = firebase.app(namespace);
    } else {
      app = firebase.app();
    }
    return app.firestore();
  }
}
