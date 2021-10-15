import { Observable } from 'rxjs';
import { SetOptions, Logger, FlewVerb, FlewChain, FlewDriver, FlewOptions, FlewDriverOption, FlewChainPayload } from '@flew/core';
export declare class FirestoreDriver implements FlewDriver {
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
    getInstance(): any;
    configure(options: FlewOptions): void;
    log(): any;
    private exceptions;
    protected where(query: any[], firestore: any): any;
    protected order(sort: any, firestore: any): any;
    protected limit(limit: number, firestore: any): any;
    find<T>(chain: FlewChainPayload, key: string): Observable<T[]>;
    findOne<T>(chain: FlewChainPayload, key: string): Observable<T>;
    on<T>(chain: FlewChainPayload, key: string): Observable<T>;
    set(chain: FlewChainPayload, data: any, options?: SetOptions): Observable<any>;
    update(chain: FlewChainPayload, data: any): Observable<any>;
    delete<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
}
