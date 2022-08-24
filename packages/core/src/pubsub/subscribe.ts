import { Subscription, Subject, finalize } from 'rxjs';
import { namespace } from '../platform';
import { unsubscribe } from './unsubscribe';

const workspace = namespace();

export function subscribe<T>(
  key: string,
  handler: (arg: T) => any = arg => {},
): Subscription {
  workspace.events[key] = new Subject().pipe(finalize(() => unsubscribe(key)));
  return workspace.events[key].subscribe(handler);
}
