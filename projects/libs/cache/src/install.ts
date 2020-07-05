import { Rebased } from '@rebased/core';

export function install(instance) {
  Rebased.storage = instance;
  Rebased.storage.enabled = true;
}
