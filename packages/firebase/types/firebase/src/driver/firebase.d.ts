import { Observable } from 'rxjs';
import { FlewChainPayload, FlewDriver, FlewDriverOption, FlewOptions, Logger, FlewVerb, FlewChain } from '@flew/core';
export declare class FirebaseDriver implements FlewDriver {
    driverName: FlewDriverOption;
    driverOptions: FlewOptions;
    logger: Logger;
    instance: any;
    verbs: {
        [key in FlewVerb]: string | boolean;
    };
    chaining: {
        [key in FlewChain]: string | boolean;
    };
    constructor(options: any);
    configure(options: FlewOptions): void;
    getInstance(): any;
    private exceptions;
    log(): Logger;
    find<T>(chain: FlewChainPayload, key: string): Observable<T[]>;
    findOne<T>(chain: FlewChainPayload, key: string): Observable<T>;
    on<T>(chain: FlewChainPayload, key: string): Observable<T>;
}
