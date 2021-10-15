/**
 * Chain query transpiler
 *
 * @export
 * @param {*} query
 * @param {*} handler
 */
export declare function transpileChainQuery(query: any, handler: any): any[];
export declare function transpileQuery(operator: any, chainQuery: any, handler: any): any[];
/**
 * Query router transpiler
 *
 * @export
 * @param {*} specialOperator
 * @param {*} chainQuery
 * @param {*} handler
 */
export declare function transpileQueryRouter(specialOperator: any, chainQuery: any, handler: any): any;
/**
 * Create query by operator
 *
 * @export
 * @param {*} value
 * @param {*} operator
 * @param {*} handler
 */
export declare function createQueryByOperator(value: any, operator: any, handler: any): any;
