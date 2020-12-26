import { Rebased } from '@rebased/core';
import { resetState } from './resetState';
import { getState } from './getState';
import { setState } from './setState';
import { createStore } from '../store/createStore';
import { applyDevTools } from '../store/applyDevTools';

/**
 * Initiate state stuff on Rebased
 *
 * @export
 */
export function install(options) {
  Rebased.state.enabled = true;
  Rebased.state.getState = getState;
  Rebased.state.resetState = resetState;
  Rebased.state.setState = setState;

  createStore(
    (options && options.reducers) || {},
    (options && options.state) || {},
    applyDevTools(options)
  );
}
