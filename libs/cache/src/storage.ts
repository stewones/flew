import { Reative, StorageAdapter } from '@reative/core';

export function storage(): StorageAdapter {
  const hasStorage = Reative.storage && Reative.storage.forEach;
  return hasStorage ? Reative.storage : ({} as StorageAdapter);
}
