import { namespace } from '../platform';
import { publish } from './publish';

const workspace = namespace();

export function unsubscribe(key: string): void {
  // cancel client listeners
  if (workspace.events[key]) {
    workspace.events[key].unsubscribe();
    workspace.events[key] = null;
  }
  // cancel livequery listeners
  if (workspace.events[`flew-livequery-unsubscribe-${key}`]) {
    publish(`flew-livequery-unsubscribe-${key}`);
  }
}
