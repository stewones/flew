import { isArray, isString, isFunction, isEmpty } from 'lodash';

/**
 * Chain query transpiler
 *
 * @export
 * @param {*} query
 * @param {*} handler
 */
export function transpileChainQuery(query, handler) {
  //
  // Hold queries
  let queries = [];

  //
  // Set plain queries
  for (const k in query) {
    //
    // Validate skip on query operators
    if (handler.skipOnQuery.includes(k)) return;
    if (handler.skipOnOperator.includes(k)) continue;

    //
    // Tranpile query
    const transpiledQuery = transpileQuery(k, query[k], handler);

    //
    // Push to queries
    queries = [...queries, ...transpiledQuery];
  }

  return queries;
}

export function transpileQuery(operator, chainQuery, handler) {
  //
  // Hold queries
  let queries = [];

  //
  // Transpile special operators
  if (handler.specialOperators.includes(operator)) {
    //
    // Fix chainQuery, must be an array
    // @todo: improve this so we don't need this workaround
    // on the first level chainQuery is an array here, but from the second forward is an object
    chainQuery = isArray(chainQuery) ? chainQuery : [chainQuery];

    //
    // Transpile in the query router
    const routedQuery: any = transpileQueryRouter(
      operator,
      chainQuery,
      handler,
    );

    const routedQueries = isArray(routedQuery) ? routedQuery : [routedQuery];
    queries = [...queries, ...routedQueries];
  }

  //
  // Transpile common operators
  else {
    //
    // Get operator value
    const value = chainQuery[operator] ? chainQuery[operator] : chainQuery;

    //
    // Treatment for arrays
    if (isArray(value) && !isString(value[0])) {
      value.map(it => {
        queries.push(createQueryByOperator(it, operator, handler));
      });
    }

    //
    // Treatment when not array
    else {
      queries.push(createQueryByOperator(value, operator, handler));
    }
  }

  return queries;
}

/**
 * Query router transpiler
 *
 * @export
 * @param {*} specialOperator
 * @param {*} chainQuery
 * @param {*} handler
 */
export function transpileQueryRouter(specialOperator, chainQuery, handler) {
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
      const nextChainQuery = handler.specialOperators.includes(operator)
        ? operators[operator]
        : operators;

      //
      // Tranpile query
      const transpiledQueries = transpileQuery(
        operator,
        nextChainQuery,
        handler,
      );

      //
      // Push to queries
      queries = [...queries, ...transpiledQueries];
    }
  });

  //
  // Validate
  if (isEmpty(queries)) return queries;

  return handler.Parse.Query[specialOperator](...queries);
}

/**
 * Create query by operator
 *
 * @export
 * @param {*} value
 * @param {*} operator
 * @param {*} handler
 */
export function createQueryByOperator(value, operator, handler) {
  //
  // Start query
  const query = new handler.Parse.Query(handler.collection);

  //
  // Create from a function
  if (isFunction(value)) {
    query[operator](...value());
  } else if (isArray(value)) {
    value.map(it => createQueryByOperator(it, operator, handler));
  } else {
    query[operator](value);
  }

  return query;
}
