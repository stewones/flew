import { storage } from './storage';

export function setCache(key, value) {
  return storage().set(key, value);
}
