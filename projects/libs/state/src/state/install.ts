import { Rebased } from '@rebased/core';
import { resetState } from './resetState';
import { getState } from './getState';
import { setState } from './setState';

/**
 * Initiate state stuff on Rebased
 *
 * @export
 */
export function install() {
  Rebased.state.enabled = true;
  Rebased.state.getState = getState;
  Rebased.state.resetState = resetState;
  Rebased.state.setState = setState;
}
