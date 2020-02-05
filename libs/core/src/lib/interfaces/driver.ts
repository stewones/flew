import { Logger } from '../utils/logger';
import { ReativeOptions } from './options';
import { ReativeVerb } from './verb';
import { ReativeChain } from './chain';

export type ReativeDriverOption =
  | 'http'
  | 'firebase'
  | 'firestore'
  | 'parse'
  | string;

//
// @experimental
export interface ReativeDriver {
  verbs?: { [key in ReativeVerb]: string | boolean }; // @todo remove optionality
  chaining?: { [key in ReativeChain]: string | boolean }; // @todo remove optionality
  driverName: ReativeDriverOption; // driver name used locally
  driverOptions: ReativeOptions;
  logger: Logger;
  instance?: any;
  log(): Logger;
  configure?(options: ReativeOptions): any; // @todo remove optionality
  getInstance?(): any;
}
