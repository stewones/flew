import { FlewDriverOption } from './driver';
import { FlewRequestConfig } from './request';
import { Logger } from '../logger';
export interface FlewOptions {
    collection?: string;
    identifier?: string;
    disableAutoID?: boolean;
    baseURL?: string;
    endpoint?: string;
    pathname?: string;
    httpConfig?: FlewRequestConfig;
    from?: FlewDriverOption;
    driver?: FlewDriverOption;
    timestampEnabled?: boolean;
    timestampObject?: boolean;
    timestampCreated?: string;
    timestampUpdated?: string;
    silent?: boolean;
    logger?: Logger;
    useCache?: boolean;
    useState?: boolean;
    useNetwork?: boolean;
    persistence?: boolean;
}
