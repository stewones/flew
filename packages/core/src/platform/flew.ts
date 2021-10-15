import { of } from 'rxjs';
import {
  FL_DRIVER,
  FL_IDENTIFIER,
  FL_TIMESTAMP_CREATED,
  FL_TIMESTAMP_UPDATED,
} from '../global';
import { FlewProtocol, StorageAdapter } from '../structure';

export const Flew: FlewProtocol = {
  options: {
    silent: false,
    driver: FL_DRIVER,
    identifier: FL_IDENTIFIER,
    timestampEnabled: false,
    disableAutoID: false,
    timestampCreated: FL_TIMESTAMP_CREATED,
    timestampUpdated: FL_TIMESTAMP_UPDATED,
    timestampObject: false,
    httpConfig: {
      timeout: 60 * 1000,
      baseURL: '',
      headers: {},
    },
  },
  state: {
    enabled: false,
    getState: () => {},
    sync: () => {},
    getState$: of(),
  },
  store: {},
  events: {},
  calls: {},
  storage: {
    enabled: false,
    get: key => Promise.resolve(),
    set: (key, val) => Promise.resolve(),
    clear: () => Promise.resolve(),
  } as StorageAdapter,
  driver: {
    http: {} as any,
  },
  drivers: ['http'],
};
