import { Rebased } from '@rebased/core';

export function firebase() {
  return Rebased.driver.firebase.getInstance();
}
