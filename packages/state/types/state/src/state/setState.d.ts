export interface SetStateOptions {
    cache?: boolean;
}
/**
 * Arbitrary way to set fetch state
 *
 * @export
 * @param {string} key
 * @param {*} value
 * @param {SetStateOptions} [options={ cache: true }]
 */
export declare function setState(key: string, value: any, options?: SetStateOptions): void;
