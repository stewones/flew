import { namespace } from './platform/namespace';
import { FlewOptions } from './structure/options';

const workspace = namespace();

export function setup(params: { options?: FlewOptions; plugins?: any[] }) {
  if (params.options) {
    for (const k in params.options) {
      workspace.options[k] = params.options[k];
    }
  }

  params?.plugins.map(plugin => plugin());
}
