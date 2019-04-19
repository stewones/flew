import { Connector } from './connector';

export type ReactiveDriverOption = 'http' | 'firebase' | 'firestore';

//
// @experimental
export interface ReactiveDriver {
  _driver: ReactiveDriverOption;
  connector: Connector;
  collection: string;
  timestamp?: boolean;
}
