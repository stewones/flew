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
  publish(`unsubscribe-${key}`, {});
}
