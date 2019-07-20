import { omit, get } from 'lodash';
import { Chain } from '../interfaces/chain';
import { Response } from '../interfaces/response';

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

export function shouldTransformResponse(chain: Chain, response: Response) {
  let transformResponse: any =
    chain.transformResponse && typeof chain.transformResponse === 'function'
      ? chain.transformResponse
      : (data: Response) => data;

  if (chain.transformData) {
    //
    // transform elastic data
    const hits = get(response, 'data.hits.hits');
    if (hits) {
      transformResponse = (data: Response) =>
        data.data.hits.hits.map(h => h._source);
    } else {
      //
      // default
      transformResponse = (data: Response) => data && data.data;
    }
  }

  return transformResponse;
}
