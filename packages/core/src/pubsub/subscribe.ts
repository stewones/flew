import { Subscription, Subject } from 'rxjs';
import { namespace } from '../platform';

const workspace = namespace();

export function subscribe<T>(
  key: string,
  handler: (arg: T) => any = arg => {},
): Subscription {
  workspace.events[key] = new Subject();
  return workspace.events[key].subscribe(handler);
}
