import { namespace } from '../platform';
import { publish } from './publish';

const workspace = namespace();

export function unsubscribe(key: string): void {
  // cancel client listeners
  if (workspace.events[key]) {
    workspace.events[key].unsubscribe();
  }
  // cancel livequery listeners
  if (workspace.events[`flew-livequery-subscription-${key}`]) {
    publish(`flew-livequery-subscription-${key}`);
    workspace.events[`flew-livequery-subscription-${key}`].unsubscribe();
  }
}
