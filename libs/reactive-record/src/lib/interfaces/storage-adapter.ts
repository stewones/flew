/**
 * storage adapter
 * you can use any class that implements this interface
 * either the package `ionic-storage`(https://github.com/ionic-team/ionic-storage)
 *
 * @export
 * @interface StorageAdapter
 */
export interface StorageAdapter<T = any> {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<any>;
  remove(key: string): Promise<any>;
  clear(): Promise<void>;
}

// @deprecated
export interface RRCacheStorage<T = any> extends StorageAdapter {}
