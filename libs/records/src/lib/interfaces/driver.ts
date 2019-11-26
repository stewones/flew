import { Logger } from '../utils/logger';
import { ReativeOptions } from './options';
import { Connectors } from './connector';

export type ReativeDriverOption = 'http' | 'firebase' | 'firestore' | 'parse';

//
// @experimental
export interface ReativeDriver {
  driverName: ReativeDriverOption; // driver name used locally
  driverOptions: ReativeOptions;
  connector: Connectors;
  logger: Logger;
  log(): Logger;
}
