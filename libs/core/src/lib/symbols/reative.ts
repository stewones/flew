import { of, Subject, PartialObserver } from 'rxjs';
import {
  RR_DRIVER,
  RR_IDENTIFIER,
  RR_TIMESTAMP_CREATED,
  RR_TIMESTAMP_UPDATED
} from '../global';
import { Connector } from '../interfaces/connector';
import { ReativeOptions } from '../interfaces/options';
import { StorageAdapter } from '../interfaces/storage';

export interface ReativeParseOptions {
  serverURL: string;
  appID: string;
}
export interface ReativeProtocol {
  options: ReativeOptions;
  connector: Connector;
  store?: any;
  storage?: StorageAdapter;
  events?: { [key: string]: Subject<any> };
  Parse?: any; // parse instance
  parse: ReativeParseOptions;
  worker?: { http: any; parse: any };
  responses?: { key: string; observer: PartialObserver<any> };
}

export const Reative: ReativeProtocol = {
  options: {
    silent: true,
    driver: RR_DRIVER,
    identifier: RR_IDENTIFIER,
    timestamp: true,
    timestampCreated: RR_TIMESTAMP_CREATED,
    timestampUpdated: RR_TIMESTAMP_UPDATED,
    httpConfig: {
      timeout: 60 * 1000,
      baseURL: '',
      headers: {}
    }
  },
  connector: {} as Connector,
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
  Parse: {},
  parse: {
    serverURL: '',
    appID: ''
  },
  worker: {
    http: false,
    parse: false
  },
  responses: {} as any
};
