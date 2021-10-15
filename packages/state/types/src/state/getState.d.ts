/**
 * Grab a piece of data from state synchronously
 *
 * @export
 * @template T
 * @param {string} path
 * @returns {T}
 */
export declare function getState<T = any>(path?: string): T;
