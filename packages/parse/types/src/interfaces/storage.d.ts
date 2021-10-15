/**
 * storage adapter
 * you can use any class that implements this interface
 * either the package `ionic-storage`(https://github.com/ionic-team/ionic-storage)
 */
export interface StorageAdapter<T = any> {
    enabled?: boolean;
    /**
     * Get the value associated with the given key.
     * @param key the key to identify this value
     * @returns Returns a promise with the value of the given key
     */
    get(key: string): Promise<any>;
    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @returns Returns a promise that resolves when the key and value are set
     */
    set(key: string, value: any): Promise<any>;
    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @returns Returns a promise that resolves when the value is removed
     */
    remove(key: string): Promise<any>;
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @returns Returns a promise that resolves when the store is cleared
     */
    clear(): Promise<void>;
    /**
     * @returns Returns a promise that resolves with the number of keys stored.
     */
    length(): Promise<number>;
    /**
     * @returns Returns a promise that resolves with the keys in the store.
     */
    keys(): Promise<string[]>;
    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     * @returns Returns a promise that resolves when the iteration has finished.
     */
    forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<void>;
}
