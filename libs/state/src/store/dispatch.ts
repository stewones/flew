import { store } from './store';

export function dispatch(action: { type: string; [key: string]: any }) {
  store().dispatch(action);
}
