export interface FirebaseInstallOptions {
    config?: any;
    firebaseInstance?: any;
    firestoreInstance?: any;
    namespace?: string;
}
/**
 * Firebase setup
 *
 * @export
 * @param {FirebaseInstallOptions} options
 */
export declare function installFirebase(options: FirebaseInstallOptions): void;
