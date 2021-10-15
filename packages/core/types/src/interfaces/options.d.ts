import { FlewDriverOption } from './driver';
import { AxiosRequestConfig } from 'axios';
import { Logger } from '../effects/logger';
export interface FlewOptions {
    collection?: string;
    identifier?: string;
    disableAutoID?: boolean;
    baseURL?: string;
    endpoint?: string;
    pathname?: string;
    httpConfig?: AxiosRequestConfig;
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
