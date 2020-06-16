import { Logger } from '../effects/logger';
import { RebasedOptions } from './options';
import { RebasedVerb } from './verb';
import { RebasedChain } from './chain';

export type RebasedDriverOption = 'http' | 'firebase' | 'firestore' | 'parse';

//
// @experimental
export interface RebasedDriver {
  verbs?: { [key in RebasedVerb]: string | boolean }; // @todo remove optionality
  chaining?: { [key in RebasedChain]: string | boolean }; // @todo remove optionality
  driverName: RebasedDriverOption; // driver name used locally
  driverOptions: RebasedOptions;
  logger: Logger;
  instance?: any;
  log(): Logger;
  configure?(options: RebasedOptions): any; // @todo remove optionality
  getInstance?(): any;
}
