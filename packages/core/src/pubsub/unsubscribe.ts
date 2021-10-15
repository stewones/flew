import { namespace } from '../platform';
import { publish } from './publish';

const workspace = namespace();

export function unsubscribe(key: string): void {
  // cancel client listeners
  if (workspace.events[key]) {
    workspace.events[key].unsubscribe();
  }
  // cancel internal listeners (ie realtime drivers call)
  if (workspace.events[`flew-${key}`]) {
    publish(`flew-${key}`);
    workspace.events[`flew-${key}`].unsubscribe();
  }
}
