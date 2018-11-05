/**
 * initialize and return the firebase instance
 *
 * @export
 * @class RRFirebaseConnector
 */
export class RRFirebaseConnector {
    constructor(firebase, config) {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            return firebase.default;
        } else {
            return firebase.apps[0].firebase_;
        }
    }
}

export class FirebaseConnector extends RRFirebaseConnector { }