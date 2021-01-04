import { of } from 'rxjs';
import {
  R_DRIVER,
  R_IDENTIFIER,
  R_TIMESTAMP_CREATED,
  R_TIMESTAMP_UPDATED
} from '../global';
import { RebasedProtocol, StorageAdapter } from '../interfaces';

export const Rebased: RebasedProtocol = {
  options: {
    silent: false,
    driver: R_DRIVER,
    identifier: R_IDENTIFIER,
    disableTimestamp: false,
    disableAutoID: false,
    timestampCreated: R_TIMESTAMP_CREATED,
    timestampUpdated: R_TIMESTAMP_UPDATED,
    timestampObject: false,
    httpConfig: {
      timeout: 60 * 1000,
      baseURL: '',
      headers: {}
    }
  },
  state: {
    enabled: false,
    getState: () => {},
    sync: () => {},
    getState$: of()
  },
  store: {},
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
  bridge: {}
};
