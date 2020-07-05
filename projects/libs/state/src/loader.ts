import { createStore } from './store/createStore';
import { applyDevTools } from './store/applyDevTools';
import { install } from './state/install';

export const stateLoader = {
  install,
  createStore,
  applyDevTools
};
