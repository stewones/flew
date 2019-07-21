import { Options } from '../interfaces/options';
import { Observable, of, Subject } from 'rxjs';
import { StorageAdapter } from '../interfaces/storage';
import { Connector } from '../interfaces/connector';

interface ReactiveOptions {
  options: Options;
  connector: Connector;
  store?: {
    enabled: boolean;
    sync: (val: any) => void;
    reset: () => void;
    get: (key: string) => any;
    set: (key: string, val: any) => void;
    select: (key: string, data?: boolean) => Observable<any>;
  };
  storage?: StorageAdapter;
  ready$: Subject<void>;
}

const ReactiveConfig: ReactiveOptions = {
  options: {
    driver: 'firestore'
  },
  connector: {} as Connector,
  store: {
    enabled: false,
    sync: (val: any) => {},
    reset: () => {},
    get: (key: string) => {},
    set: (key: string, val: any) => {},
    select: (key: string, data?: boolean) => of({})
  },
  storage: {
    get: key => {},
    set: (key, val) => {},
    clear: () => {}
  } as StorageAdapter,
  ready$: new Subject()
};

/**
 * @name Config
 * @deprecated use `Reactive` instead
 */
export const Config = ReactiveConfig;
export const Reactive = ReactiveConfig;
