import { omit } from 'lodash';

export function clearNetworkResponse(data) {
  return omit(data, [
    'config',
    'request',
    'response.config',
    'response.data',
    'response.request'
  ]);
}
