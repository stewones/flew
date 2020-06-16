import { Rebased } from '@rebased/core';

export interface CacheOptions {
  dbName: string;
  dbStore: string;
}

export function install(instance) {
  Rebased.storage = instance;
  Rebased.storage.enabled = true;
}
