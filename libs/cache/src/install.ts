import { Reative } from '@reative/core';

export interface CacheOptions {
  dbName: string;
  dbStore: string;
}

export function install(instance) {
  Reative.storage = instance;
  Reative.storage.enabled = true;
}
