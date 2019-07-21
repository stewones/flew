import { Connector } from './connector';
import { Logger } from '../utils/logger';

export type ReativeDriverOption = 'http' | 'firebase' | 'firestore';

//
// @experimental
export interface ReativeDriver {
  _driver: ReativeDriverOption; // driver name used locally
  connector: Connector;
  collection: string;
  timestamp?: boolean; // whether should auto add `updated_at`
  logger: Logger;
  log(): Logger;
}
