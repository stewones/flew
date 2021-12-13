import { FlewDriverOption } from './driver';
export declare type FlewChain = 'from' | 'network' | 'cache' | 'key' | 'query' | 'where' | 'sort' | 'size' | 'at' | 'after' | 'ref' | 'http' | 'include' | 'doc' | 'token' | 'master' | 'object' | 'select' | 'state' | 'near' | 'withinKilometers' | 'withinMiles' | 'diff' | 'response' | 'context';
export interface FlewChainPayloadWhere {
    field: string;
    operator: string;
    value: any;
}
export interface FlewChainPayload {
    key?: string;
    from?: FlewDriverOption;
    useState?: boolean;
    useCache?: boolean;
    useNetwork?: boolean;
    useMasterKey?: boolean;
    useSessionToken?: string;
    useObject?: boolean;
    useWorker?: boolean;
    ref?: string;
    query?: any;
    where?: FlewChainPayloadWhere[];
    size?: number;
    sort?: any | any[];
    doc?: any;
    at?: any;
    after?: any;
    fields?: string[];
    select?: string[];
    near?: any;
    withinKilometers?: any;
    withinMiles?: any;
    diff?: any;
    response?: any;
    context?: any;
}
