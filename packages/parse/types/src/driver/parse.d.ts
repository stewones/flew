import { FlewDriver, FlewChainPayload, FlewDriverOption, FlewOptions, FlewVerb, FlewChain, Logger } from '@flew/core';
import { Observable } from 'rxjs';
import { ParseOptions } from '../structure/options';
export declare class ParseDriver implements FlewDriver {
    options: Partial<ParseOptions>;
    instance: any;
    driverName: FlewDriverOption;
    driverOptions: FlewOptions;
    connector: any;
    logger: Logger;
    skipOnQuery: string[];
    skipOnOperator: string[];
    specialOperators: string[];
    verbs: {
        [key in FlewVerb]: string | boolean;
    };
    chaining: {
        [key in FlewChain]: string | boolean;
    };
    constructor(options: ParseOptions);
    configure(driverOptions: FlewOptions): any;
    getInstance(): any;
    log(): Logger;
    find<T>(chain: FlewChainPayload, key: string, method?: string): Observable<T[]>;
    findOne<T>(chain: FlewChainPayload, key: string): Observable<T>;
    on<T>(chain: FlewChainPayload, key: string): Observable<T>;
    set(chain: FlewChainPayload, data: any, options?: {
        all: boolean;
    }): Observable<any>;
    run(name: string, payload: any, key: string): Observable<any>;
    update(chain: FlewChainPayload, data: any): Observable<any>;
    count<T>(chain: FlewChainPayload, key: string): Observable<any>;
    delete<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
    getCollectionName(): any;
    isSpecialQuery(chain: FlewChainPayload): boolean;
}
