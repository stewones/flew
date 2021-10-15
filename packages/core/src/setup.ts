import { namespace, FlewOptions } from '@flew/core';
const workspace = namespace();

export function setup(params: { options?: FlewOptions; plugins?: any[] }) {
  if (params.options) {
    for (const k in params.options) {
      workspace.options[k] = params.options[k];
    }
  }

  params?.plugins.map(plugin => plugin());
}
