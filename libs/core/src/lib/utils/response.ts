import { omit, get, isFunction } from 'lodash';
import { ReativeChainPayload } from '../interfaces/chain';

/**
 * @deprecated
 */
export function clearNetworkResponse(data) {
  return omit(data, [
    'took',
    'config',
    'request',
    'response.config',
    'response.data',
    'response.request'
  ]);
}

/**
 * @deprecated
 */
export function shouldTransformResponse(
  chain: ReativeChainPayload,
  response: any
) {
  const customTransform = isFunction(chain.transformResponse);
  let transformResponse: any = customTransform
    ? chain.transformResponse
    : (data: any) => data;

  if (chain.transformData) {
    //
    // transform elastic data
    const hits = get(response, 'data.hits.hits');
    if (hits) {
      transformResponse = (data: any) =>
        data.data.hits.hits.map(h => h._source);
    } else {
      transformResponse = (data: any) => data && data.data;
    }
  }

  if (customTransform) {
    transformResponse = chain.transformResponse;
  }

  return transformResponse;
}
