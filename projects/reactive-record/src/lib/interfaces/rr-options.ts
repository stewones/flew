import { RRHook } from './rr-hook';
import { RRConnector } from './rr-connector';

/**
 * @export
 * @interface RROptions
 */
export interface RROptions {
  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  collection?: string; // eg: users
  driver?: string; // available for now: `firestore` and `elastic`
  timestamp?: boolean; // whether or not to add `updated_at` timestamp
  hook?: RRHook;
  connector?: RRConnector;
}
