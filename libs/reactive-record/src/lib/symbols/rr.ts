import { Options } from '../interfaces/options';
import { Subject } from 'rxjs';
import { StorageAdapter } from '../interfaces/storage';
import { Connector } from '../interfaces/connector';

interface ReactiveOptions {
  options: Options;
  connector: Connector;
  store?: {
    enabled: boolean;
    sync: Subject<any>;
    reset: Subject<void>;
    get: (key: string) => any;
    set: (key: string, val: any) => any;
  };
  storage?: StorageAdapter;
}

const ReactiveConfig: ReactiveOptions = {
  options: {
    driver: 'firestore'
  },
  connector: {} as Connector,
  store: {
    enabled: false,
    sync: new Subject(),
    reset: new Subject(),
    get: (key: string) => {},
    set: (key: string, val: any) => {}
  },
  storage: {} as StorageAdapter
};

/**
 * @name Config
 * @deprecated use `Reactive` instead
 */
export const Config = ReactiveConfig;
export const Reactive = ReactiveConfig;
