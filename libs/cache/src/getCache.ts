import { storage } from './storage';

export function getCache(key) {
  return storage().get(key);
}
