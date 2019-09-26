import { Reative } from '../symbols/reative';
import { Subject, Subscription } from 'rxjs';

export function publish<T>(key: string, value: T) {
  if (Reative.events[key]) {
    Reative.events[key].next(value);
  } else {
    throw `No subscription available for key ${key}`;
  }
}

export function subscribe<T>(
  key: string,
  handler: (arg: T) => any
): Subscription {
  if (!Reative.events[key]) {
    Reative.events[key] = new Subject();
  }
  return Reative.events[key].subscribe(handler);
}
