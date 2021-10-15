import { Subscription, Subject } from 'rxjs';
import { Rebased } from '../symbols/rebased';

export function subscribe<T>(
  key: string,
  handler: (arg: T) => any = arg => {}
): Subscription {
  Rebased.events[key] = new Subject();
  return Rebased.events[key].subscribe(handler);
}
