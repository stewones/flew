importScripts('parse.min.js');
importScripts('lodash.min.js');

const { isArray, isString, isFunction, isNil, isEmpty, isObject } = _;

var localStorageData = {};
var localStorage = {
  getItem: key => localStorageData[key],
  setItem: (key, val) => (localStorageData[key] = val)
};

onmessage = req => {
  const data = req.data || {};
  const appID = data.appID;
  const serverURL = data.serverURL;
  const key = data.key;
  const chain = data.chain;
  const collection = data.collection;
  const skipOnOperator = data.skipOnOperator;
  const skipOnQuery = data.skipOnQuery;
  const specialOperators = data.specialOperators;

  Parse.initialize(appID);
  Parse.serverURL = serverURL;

  const verb =
    chain.query && chain.query['aggregate']
      ? 'aggregate'
      : chain.query && chain.query['or']
      ? 'or'
      : 'find';

  //
  // define adapter
  let connector = new Parse.Query(collection);

  //
  // Transpile chain query
  const query = transpileChainQuery(chain.query, {
    skipOnQuery: skipOnQuery,
    skipOnOperator: skipOnOperator,
    specialOperators: specialOperators,
    collection: collection
  });

  //
  // Join query with connector
  if (!isEmpty(query)) {
    connector = Parse.Query.and(...query);
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

  //
  // network handle
  const success = async data => {
    const result = [];
    for (const item of data) {
      // tslint:disable-next-line: deprecation
      const entry =
        item && isFunction(item.toJSON) && !chain.useObject
          ? item.toJSON()
          : item;

      if (!chain.useObject) {
        // @todo add id for nested results
        entry.id = entry.objectId;
      }
      result.push(entry);
    }

    //
    // @todo auto populate `id` on included fields - need more work
    // if (chain.fields && chain.fields.length) {
    //   result.map(entry => {
    //     chain.fields.map(field => {
    //       const whatever: any = get(entry, field);
    //       if (isArray(whatever)) {
    //         whatever.map(it => {
    //           it.id = it.objectId;
    //         });
    //       }
    //       if (isObject(whatever)) {
    //         whatever.id = whatever.objectId;
    //       }
    //     });
    //   });
    // }

    //
    // success callback
    postMessage({ key: key, collection: collection, data: result });
  };

  const error = err => {
    postMessage({ key: key, collection: collection, error: err });
  };

  switch (verb) {
    case 'aggregate':
      connector
        .aggregate(chain.query['aggregate'], {
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(success)
        .catch(error);
      break;

    default:
      connector
        .find({
          useMasterKey: chain.useMasterKey,
          sessionToken: chain.useSessionToken
        })
        .then(success)
        .catch(error);
      break;
  }
};

function transpileChainQuery(query, extra) {
  //
  // Hold queries
  let queries = [];

  //
  // Set plain queries
  for (const k in query) {
    //
    // Validate skip on query operators
    if (extra.skipOnQuery.includes(k)) return;
    if (extra.skipOnOperator.includes(k)) continue;

    //
    // Tranpile query
    const transpiledQuery = transpileQuery(k, query[k], extra);

    //
    // Push to queries
    queries = [...queries, ...transpiledQuery];
  }

  return queries;
}

function transpileQuery(operator, chainQuery, extra) {
  //
  // Hold queries
  let queries = [];

  //
  // Transpile special operators
  if (extra.specialOperators.includes(operator)) {
    //
    // Fix chainQuery, must be an array
    // @todo: improve this so we don't need this workaround
    // on the first level chainQuery is an array here, but from the second forward is an object
    chainQuery = isArray(chainQuery) ? chainQuery : [chainQuery];

    //
    // Transpile in the query router
    const routedQuery = transpileQueryRouter(operator, chainQuery, extra);
    queries = [...queries, ...routedQuery];
  }

  //
  // Transpile common operators
  else {
    //
    // Get operator value
    const value = chainQuery[operator] ? chainQuery[operator] : chainQuery;

    //
    // Treatment for arrays
    if (isArray(value) && isString(value[0])) {
      value.map(it => {
        queries.push(createQueryByOperator(it, operator, extra));
      });
    }

    //
    // Treatment when not array
    else {
      queries.push(createQueryByOperator(value, operator, extra));
    }
  }

  return queries;
}

function transpileQueryRouter(specialOperator, chainQuery, extra) {
  //
  // Hold queries
  let queries = [];

  //
  // Transpile queries
  chainQuery.map(operators => {
    for (const operator in operators) {
      //
      // Set next new chain query
      // If our operator if a special operator this is after first level and we must send the special operator query value
      const nextChainQuery = extra.specialOperators.includes(operator)
        ? operators[operator]
        : operators;

      //
      // Tranpile query
      const transpiledQueries = transpileQuery(operator, nextChainQuery, extra);

      //
      // Push to queries
      queries = [...queries, ...transpiledQueries];
    }
  });

  //
  // Validate
  if (isEmpty(queries)) return queries;

  return Parse.Query[specialOperator](...queries);
}

function where(query = [], connector) {
  const mapping = {
    id: 'objectId'
  };
  query.map(q => {
    if (isNil(q.value)) throw Error(`value can't be null for parse where`);

    if (mapping[q.field]) q.field = mapping[q.field];

    setWhere(q, connector);
    // this.log().success()(
    //   `parse where -> ${q.field} ${q.operator} ${
    //     q.value && q.value.id ? q.value.id : q.value
    //   }`
    // );
  });
}

function setWhere(q, connector) {
  switch (q.operator) {
    case '==':
      connector.equalTo(q.field, q.value);
      break;

    case '>=':
      connector.greaterThanOrEqualTo(q.field, q.value);
      break;

    case '<=':
      connector.lessThanOrEqualTo(q.field, q.value);
      break;

    case '>':
      connector.greaterThan(q.field, q.value);
      break;

    case '<':
      connector.lessThan(q.field, q.value);
      break;

    case 'array-contains':
      connector.containedIn(q.field, isArray(q.value) ? q.value : [q.value]);
      break;

    default:
      break;
  }
}

function order(sort, connector) {
  if (isArray(sort)) {
    // this.log().success()(`parse sort array -> ${sort}`);
    sort.map(s => {
      if (isEmpty(s)) throw new Error(`sort object in array can't be null`);
      for (const k in s) {
        if (s[k] === 'asc') {
          connector.ascending(k);
        }
        if (s[k] === 'desc') {
          connector.descending(k);
        }
      }
    });
  } else if (isObject(sort)) {
    // this.log().success()(`parse sort object -> ${JSON.stringify(sort)}`);
    if (isEmpty(sort)) throw new Error(`sort object can't be null`);
    for (const k in sort) {
      if (sort[k] === 'asc') {
        connector.ascending(k);
      }
      if (sort[k] === 'desc') {
        connector.descending(k);
      }
    }
  }
}

function limit(limit, connector) {
  // this.log().success()(`parse limit -> ${limit}`);
  connector.limit(limit);
}

function skip(value, connector) {
  // this.log().success()(`parse after -> ${value}`);
  connector.skip(value);
}

function createQueryByOperator(value, operator, extra) {
  //
  // Start query
  const query = new Parse.Query(extra.collection);

  //
  // Create from a function
  if (isFunction(value)) {
    query[operator](...value());
  } else if (isArray(value)) {
    value.map(it => createQueryByOperator(it, operator, extra.collection));
  } else {
    query[operator](value);
  }

  return query;
}
