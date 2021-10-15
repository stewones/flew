import { FlewOptions } from './options';
import { FlewVerb } from './verb';
import { FlewChain } from './chain';
import { Logger } from '../logger';
export declare type FlewDriverOption = 'http' | 'firebase' | 'firestore' | 'parse';
export interface FlewDriver {
    verbs?: {
        [key in FlewVerb]: string | boolean;
    };
    chaining?: {
        [key in FlewChain]: string | boolean;
    };
    driverName: FlewDriverOption;
    driverOptions: FlewOptions;
    logger: Logger;
    instance?: any;
    log(): Logger;
    configure?(options: FlewOptions): any;
    getInstance?(): any;
}
