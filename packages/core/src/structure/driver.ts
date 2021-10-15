import { FlewOptions } from './options';
import { FlewVerb } from './verb';
import { FlewChain } from './chain';
import { Logger } from '../logger';

export type FlewDriverOption = 'http' | 'firebase' | 'firestore' | 'parse';

export interface FlewDriver {
  verbs?: { [key in FlewVerb]: string | boolean }; // @todo remove optionality
  chaining?: { [key in FlewChain]: string | boolean }; // @todo remove optionality
  driverName: FlewDriverOption; // driver name used locally
  driverOptions: FlewOptions;
  logger: Logger;
  instance?: any;
  log(): Logger;
  configure?(options: FlewOptions): any; // @todo remove optionality
  getInstance?(): any;
}
