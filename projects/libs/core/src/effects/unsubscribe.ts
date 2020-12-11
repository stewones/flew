import { Rebased } from '../symbols/rebased';
import { publish } from './publish';

export function unsubscribe(key: string): void {
  //
  // cancel client listeners
  if (Rebased.events[key]) {
    Rebased.events[key].unsubscribe();
  }

  //
  // cancel internal listeners (ie drivers realtime call)
  if (Rebased.events[`internal-${key}`]) {
    publish(`internal-${key}`);
    Rebased.events[`internal-${key}`].unsubscribe();
  }
}
