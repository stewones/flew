import { Hook } from './hook';
import { Connector } from './connector';

/**
 * @export
 * @interface RROptions
 */
export interface RROptions {
  name?: string; // collection name. eg: 'todos'
  baseURL?: string; // eg: http://35.102.182.155:9200
  endpoint?: string; // eg: /api
  collection?: string; // eg: users
  driver?: string; // available for now: `firestore` and `elastic`
  timestamp?: boolean; // whether or not to add `updated_at` timestamp
  hook?: Hook;
  connector?: Connector;
  useCache?: boolean; // whether or not use cache (works only in browser)
}
