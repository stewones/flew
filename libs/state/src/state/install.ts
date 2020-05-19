import { Reative } from '@reative/core';
import { resetState } from './resetState';
import { setState } from './setState';
import { getState } from './getState';
import { removeState } from './removeState';

/**
 * Initiate state stuff on Reative Platform
 *
 * @export
 */
export function install() {
  Reative.state.enabled = true;
  Reative.state.getState = getState;
  Reative.state.setState = setState;
  Reative.state.removeState = removeState;
  Reative.state.resetState = resetState;
  Reative.state.addState = setState; // @deprecated
}
