import { Subject } from 'rxjs';
import {
  RebasedOptions,
  StorageAdapter,
  RebasedDriver,
  RebasedDriverOption
} from './';

export interface RebasedProtocol {
  options: RebasedOptions;
  store?: any;
  state?: any;
  storage?: StorageAdapter;
  events?: { [key: string]: Subject<any> };
  bridge?: {
    [key: string]: any;
  };
  driver?: { [key: string]: RebasedDriver };
  drivers?: RebasedDriverOption[];
}
