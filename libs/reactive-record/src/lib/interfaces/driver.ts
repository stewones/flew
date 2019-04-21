import { Connector } from './connector';
import { Logger } from '../utils/logger';

export type ReactiveDriverOption = 'http' | 'firebase' | 'firestore';

//
// @experimental
export interface ReactiveDriver {
  _driver: ReactiveDriverOption; // driver is also a chain option
  connector: Connector;
  collection: string;
  timestamp?: boolean;
  logger: Logger;
  log(): Logger;
}
