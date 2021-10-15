/// <reference types="localforage" />
import { StorageAdapter } from '@flew/core';
/**
 * Retrieve the storage instance
 *
 * @export
 * @returns {StorageAdapter}
 */
export declare function storage(): StorageAdapter;
/**
 * Config helper
 *
 * @export
 * @param {string} [db='app:db']
 * @param {string} [store='app:store']
 * @param {string} [driver=['sqlite', 'indexeddb', 'localstorage']]
 * @returns {*}
 */
export declare function storageConfig(db?: string, store?: string, driver?: string[]): {
    name: string;
    storeName: string;
    driverOrder: string[];
};
export interface StorageConfig {
    name?: string;
    version?: number;
    size?: number;
    storeName?: string;
    description?: string;
    driverOrder?: string[];
    dbKey?: string;
}
/**
 * Storage implementation
 *
 * @export
 * @class Storage
 */
export declare class Storage {
    private _dbPromise;
    private _driver;
    constructor(config: StorageConfig);
    /**
     * Get the name of the driver being used.
     * @returns Name of the driver
     */
    get driver(): string | null;
    /**
     * Reflect the readiness of the store.
     * @returns Returns a promise that resolves when the store is ready
     */
    ready(): Promise<LocalForage>;
    /** @hidden */
    private _getDriverOrder;
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
    forEach(iteratorCallback: (value: any, key: string, iterationNumber: number) => any): Promise<void>;
}
