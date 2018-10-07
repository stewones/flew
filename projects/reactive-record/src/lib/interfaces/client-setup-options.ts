import { RROptions } from "./rr-options";
import { FirebaseConfig } from "./firebase-config";
import { ClientStorage } from "./client-storage";
import { ClientToken } from "./client-token";

/**
 * @export
 * @interface ClientSetupOptions
 * @extends {RROptions}
 */
export interface ClientSetupOptions extends RROptions {
    ttl?: number,                                   // time to live in seconds. (default 0)
    config?: FirebaseConfig                         // firebase web config
    firebase?: any,                                 // firebase sdk to initialize connectors
    storage?: ClientStorage | any,                  // storage adapter
    version?: string,                               // add 'accept-version' to http headers
    token?: ClientToken                             // add 'Authorization' token to http headers
}