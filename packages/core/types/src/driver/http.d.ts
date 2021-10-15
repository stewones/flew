import { AxiosInstance } from 'axios';
import { Observable } from 'rxjs';
import { FlewDriver, FlewDriverOption } from '../interfaces/driver';
import { FlewOptions } from '../interfaces/options';
import { Logger } from '../effects/logger';
import { FlewChainPayload, FlewChain } from '../interfaces/chain';
import { FlewVerb } from '../interfaces/verb';
export declare class HttpDriver implements FlewDriver {
    driverName: FlewDriverOption;
    driverOptions: FlewOptions;
    instance: AxiosInstance;
    logger: Logger;
    verbs: {
        [key in FlewVerb]: string | boolean;
    };
    chaining: {
        [key in FlewChain]: string | boolean;
    };
    constructor();
    getInstance(): AxiosInstance;
    configure(options: FlewOptions): void;
    log(): Logger;
    executeRequest<T>(method: 'get' | 'post' | 'patch' | 'delete', path: string, key: string, body: any, chain: FlewChainPayload): Observable<T>;
    get<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
    post<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
    patch<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
    delete<T>(path: string, key: string, payload: any, chain: FlewChainPayload): Observable<T>;
    private translateOperator;
}
