import { namespace } from '../platform';

const workspace = namespace();

export function publish<T>(key: string, value?: T) {
  if (workspace.events[key]) {
    workspace.events[key].next(value);
  }
}
