import { ReativeChainPayload } from '@reative/core';
import { transpileChainQuery } from './transpile';
import { isEmpty } from 'lodash';
import { where } from './where';
import { order } from './order';
import { limit } from './limit';
import { skip } from './skip';
import { QueryHandler } from '../interfaces/query';

export function find(handler: QueryHandler) {
  const chain = handler.chain;
  //
  // @todo abstract common functions to remove this whole part
  const verb =
    handler.chain.query && handler.chain.query['aggregate']
      ? 'aggregate'
      : chain.query && handler.chain.query['or']
      ? 'or'
      : 'find';

  //
  // define adapter
  let connector = new handler.Parse.Query(handler.collection);

  //
  // Transpile chain query
  const query: any = transpileChainQuery(chain.query, handler);

  //
  // Join query with connector
  if (!isEmpty(query)) {
    connector = handler.Parse.Query.and(...query);
  }

  //
  // set include (pointers, relation, etc)
  if (chain.fields) {
    connector.include(chain.fields);
  }

  if (chain.query && chain.query.include) {
    connector.include(chain.query.include);
  }

  //
  // set where
  where(chain.where, connector);

  //
  // set order
  order(chain.sort, connector);

  //
  // set limit
  if (chain.size) limit(chain.size, connector);

  //
  // set skip
  if (chain.after) skip(chain.after, connector);

  switch (verb) {
    case 'aggregate':
      connector
        .aggregate(chain.query['aggregate'], {
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(r => handler.success({ data: r }))
        .catch(handler.error);
      break;

    default:
      connector
        .find({
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(r => handler.success({ data: r }))
        .catch(handler.error);
      break;
  }
}
