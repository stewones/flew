import { namespace } from '@flew/core';
import { getState } from './state/getState';
import { resetState } from './state/resetState';
import { setState } from './state/setState';
import { applyDevTools } from './store/applyDevTools';
import { createStore } from './store/createStore';

const workspace = namespace();

export interface FlewStateOptions {
  production?: boolean;
  reducers?: any;
  state?: any; // the initial state
  trace?: boolean; // see more options at https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  traceLimit?: number;
  enhancers?: any;
}

/**
 * Bootstrap state stuff for Flew
 *
 * @export
 */
export function installState(options: FlewStateOptions) {
  workspace.state.enabled = true;
  workspace.state.getState = getState;
  workspace.state.resetState = resetState;
  workspace.state.setState = setState;

  createStore(
    options?.reducers || {},
    options?.state || {},
    options?.enhancers || applyDevTools(options),
  );
}
