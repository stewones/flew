import { Rebased } from '../symbols/rebased';
import { publish } from './publish';

export function unsubscribe(key: string): void {
  //
  // for user pub/sub events
  if (Rebased.events[key]) {
    Rebased.events[key].unsubscribe();
  }
  //
  // for any internal resource
  if (Rebased.events[`unsubscribe-${key}`]) {
    Rebased.events[`unsubscribe-${key}`].unsubscribe();
  }
  //
  // for drivers to be able to unsubscribe from realtime events
  publish(`unsubscribe-${key}`);
}
