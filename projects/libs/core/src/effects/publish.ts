import { Rebased } from '../symbols/rebased';

export function publish<T>(key: string, value?: T) {
  if (Rebased.events[key]) {
    Rebased.events[key].next(value);
  }
}
