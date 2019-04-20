import { omit } from 'lodash';

export function clearNetworkResponse(network) {
  return omit(network, [
    'config',
    'request',
    'response.config',
    'response.data',
    'response.request'
  ]);
}
