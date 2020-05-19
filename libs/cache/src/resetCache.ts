import { storage } from './storage';

export function resetCache() {
  storage().clear();
}
