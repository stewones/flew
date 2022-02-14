import 'firebase/database';
import 'firebase/firestore';
export interface FirebaseInstallOptions {
    config?: any;
    firebaseInstance?: any;
    firestoreInstance?: any;
    namespace?: string;
}
export declare function firebasePlugin(options: FirebaseInstallOptions): () => void;
