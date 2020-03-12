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

export class FirestoreConnector {
  constructor(firebase, config, namespace = '', settings = {}) {
    let firestore;

    try {
      firebase.initializeApp(config, namespace);
    } catch (err) {
      if (!/already exists/.test(err.message))
        console.error('Firebase initialization error', err.stack);
    }

    const app = firebase.app(namespace);
    firestore = app.firestore();
    firestore.settings(settings);

    return firestore;
  }
}
