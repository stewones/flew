import { Connector } from './connector';
import { Logger } from '../utils/logger';

export type ReactiveDriverOption = 'http' | 'firebase' | 'firestore';

//
// @experimental
export interface ReactiveDriver {
  _driver: ReactiveDriverOption; // driver name used locally
  connector: Connector;
  collection: string;
  timestamp?: boolean; // whether should auto add `updated_at`
  logger: Logger;
  log(): Logger;
}
