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
  store?: {
    enabled: boolean;
    sync: (val: any) => void;
    reset: () => void;
    get: <T>(key: string) => T;
    set: (key: string, val: any) => void;
    select: <T>(key: string, raw?: boolean) => Observable<T>;
  };
  storage?: StorageAdapter;
  events?: { [key: string]: Subject<any> };
  parse?: any;
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
    sync: (val: any) => {},
    reset: () => {},
    get: <T>(key: string) => ({} as T),
    set: (key: string, val: any) => {},
    select: <T>(key: string, raw?: boolean) => of({} as T)
  },
  storage: {
    get: key => {},
    set: (key, val) => {},
    clear: () => {}
  } as StorageAdapter,
  events: {},
  parse: {}
};
