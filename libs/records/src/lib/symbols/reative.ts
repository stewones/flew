import { Options } from '../interfaces/options';
import { Observable, of, Subject } from 'rxjs';
import { StorageAdapter } from '../interfaces/storage';
import { Connector } from '../interfaces/connector';

interface ReativeProtocol {
  options: Options;
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
  ready$: Subject<void>;
  events?: { [key: string]: Subject<any> };
  parse?: any;
}

export const Reative: ReativeProtocol = {
  ready$: new Subject(), // experimental
  options: {
    driver: 'firestore'
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
