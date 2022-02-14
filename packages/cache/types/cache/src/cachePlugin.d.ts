export interface FlewCacheOptions {
    name: string;
    store: string;
    driver?: string[];
}
/**
 * Cache setup
 *
 * @export
 * @param {*} name
 * @param {*} store
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 */
export declare function cachePlugin(options: FlewCacheOptions): () => void;
