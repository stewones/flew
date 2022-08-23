import { Subject } from 'rxjs';
import { FlewOptions, StorageAdapter, FlewDriver, FlewDriverOption } from './';

export interface FlewProtocol {
  options: FlewOptions;
  state: any;
  events: any;
  storage: StorageAdapter;
  store?: any;
  driver?: { [key: string]: FlewDriver };
  drivers?: FlewDriverOption[];
}
