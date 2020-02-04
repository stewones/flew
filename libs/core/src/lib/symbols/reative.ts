import { of, Subject, PartialObserver } from 'rxjs';
import {
  R_DRIVER,
  R_IDENTIFIER,
  R_TIMESTAMP_CREATED,
  R_TIMESTAMP_UPDATED
} from '../global';
import { ReativeOptions } from '../interfaces/options';
import { StorageAdapter } from '../interfaces/storage';
import { ReativeDriver, ReativeDriverOption } from '../interfaces/driver';

export interface ReativeProtocol {
  options: ReativeOptions;
  store?: any;
  storage?: StorageAdapter;
  events?: { [key: string]: Subject<any> };
  worker?: { http: any; parse: any };
  responses?: {
    // reative key
    [key: string]: {
      key: string;
      observer: PartialObserver<any>;
    };
  };

  driver?: { [key: string]: ReativeDriver };
  drivers?: ReativeDriverOption[];
}

export const Reative: ReativeProtocol = {
  options: {
    silent: true,
    driver: R_DRIVER,
    identifier: R_IDENTIFIER,
    timestamp: true,
    timestampCreated: R_TIMESTAMP_CREATED,
    timestampUpdated: R_TIMESTAMP_UPDATED,
    httpConfig: {
      timeout: 60 * 1000,
      baseURL: '',
      headers: {}
    }
  },
  store: {
    enabled: false,
    getState: () => {},
    sync: () => {},
    getState$: of()
  },
  storage: {
    enabled: false,
    get: key => Promise.resolve(),
    set: (key, val) => Promise.resolve(),
    clear: () => Promise.resolve()
  } as StorageAdapter,
  events: {},
  driver: {
    http: {} as any
  },
  drivers: ['http'],
  worker: {
    http: false,
    parse: false
  },
  responses: {} as any
};
