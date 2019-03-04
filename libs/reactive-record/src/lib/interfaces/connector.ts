/**
 * @export
 * @interface Connector
 */
export interface Connector {
  firebase?: any;
  firestore?: any;
}
// @deprecated
export interface RRConnector extends Connector {}
