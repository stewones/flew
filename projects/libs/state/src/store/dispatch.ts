import { store } from './createStore';

export interface Action {
  type: string;
  payload: any;
}

/**
 * Action dispatcher
 *
 * @export
 * @param {Action} action
 * @returns {any}
 */
export function dispatch(action: Action & any) {
  return store().dispatch(action);
}
