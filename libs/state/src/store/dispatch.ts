import { store } from './store';
export interface Action {
  type: string;
  [key: string]: any;
}

export function dispatch(action: Action & any) {
  return store().dispatch(action);
}
