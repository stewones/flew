import { namespace, FlewOptions } from '@flew/core';
const workspace = namespace();

export function installNetwork(params: FlewOptions) {
  for (const k in params) {
    workspace.options[k] = params[k];
  }
}
