/**
 * Remove specific fetch state
 *
 * @export
 * @param {string} key
 * @param {{ cache: boolean }} [options={ cache: true }]
 * @returns {Promise<void>}
 */
export declare function unsetState(key: string, options?: {
    cache: boolean;
}): Promise<void>;
