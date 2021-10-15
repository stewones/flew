import { Subject } from 'rxjs';
import { FlewOptions, StorageAdapter, FlewDriver, FlewDriverOption } from './';
export interface FlewProtocol {
    options: FlewOptions;
    store?: any;
    state?: any;
    storage?: StorageAdapter;
    events?: {
        [key: string]: Subject<any>;
    };
    bridge?: {
        [key: string]: any;
    };
    driver?: {
        [key: string]: FlewDriver;
    };
    drivers?: FlewDriverOption[];
}
