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
  constructor(firebase, config) {
    let firestore;
    const settings = {
      /* your settings...  timestampsInSnapshots: true */
    };
    try {
      firebase.initializeApp(config);
    } catch (err) {
      if (!/already exists/.test(err.message))
        console.error('Firebase initialization error', err.stack);
    }
    if (!firebase.apps.length) {
      firestore = firebase.default.firestore();
      firestore.settings(settings);
    } else {
      try {
        firestore = firebase.apps[0].firebase_.firestore();
        firestore.settings(settings);
      } catch (err) {}
    }
    return firestore;
  }
}
