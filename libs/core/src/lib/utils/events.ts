import { Reative } from '../symbols/reative';
import { Subject, Subscription } from 'rxjs';

export function publish<T>(key: string, value: T) {
  if (Reative.events[key]) {
    Reative.events[key].next(value);
  }
}

export function subscribe<T>(
  key: string,
  handler: (arg: T) => any = arg => {}
): Subscription {
  Reative.events[key] = new Subject();
  return Reative.events[key].subscribe(handler);
}

export function unsubscribe(key: string): void {
  //
  // for user pub/sub events
  if (Reative.events[key]) {
    Reative.events[key].unsubscribe();
  }
  //
  // for any internal resource
  publish(`unsubscribe-${key}`, {});
}
