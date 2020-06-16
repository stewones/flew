import { Rebased, StorageAdapter } from '@rebased/core';

export function storage(): StorageAdapter {
  const hasStorage = Rebased.storage && Rebased.storage.forEach;
  return hasStorage ? Rebased.storage : ({} as StorageAdapter);
}
