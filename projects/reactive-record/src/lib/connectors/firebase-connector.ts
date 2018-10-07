/**
 * initialize and return the firebase instance
 *
 * @export
 * @class FirebaseConnector
 */
export class FirebaseConnector {
    constructor(firebase, config) {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            return firebase.default;
        } else {
            return firebase.apps[0].firebase_;
        }
    }
}