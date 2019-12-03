import { Observable, of, Subject } from 'rxjs';
import {
  RR_DRIVER,
  RR_IDENTIFIER,
  RR_TIMESTAMP_CREATED,
  RR_TIMESTAMP_UPDATED
} from '../global';
import { Connector } from '../interfaces/connector';
import { ReativeOptions } from '../interfaces/options';
import { StorageAdapter } from '../interfaces/storage';

interface ReativeProtocol {
  options: ReativeOptions;
  connector: Connector;
  store?: any;
  storage?: StorageAdapter;
  events?: { [key: string]: Subject<any> };
  Parse?: any; // parse instance
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
  store: {},
  storage: {
    get: key => {},
    set: (key, val) => {},
    clear: () => {}
  } as StorageAdapter,
  events: {},
  Parse: {}
};
