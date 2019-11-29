import { AxiosInstance } from 'axios';

export type ConnectorHttp = AxiosInstance | any;
export type ConnectorFirestore = any;
export type ConnectorFirebase = any;
export type ConnectorParse = any;

export type Connectors =
  | ConnectorHttp
  | ConnectorFirestore
  | ConnectorFirebase
  | ConnectorParse;

export interface Connector {
  http?: ConnectorHttp;
  firestore?: ConnectorFirestore;
  firebase?: ConnectorFirebase;
  parse?: ConnectorParse;
}
