import { Reative } from '@reative/core';

/**
 * Parse Options
 *
 * @export
 * @interface ParseOptions
 */
export interface ParseOptions {
  serverURL: string;
  appID: string;
  masterKey?: string;
}

/**
 * Extend Parse Object
 *
 * @export
 * @param {string} name
 * @returns Parse.Object
 */
export function model(name: string) {
  const Entity = Reative.Parse.Object.extend(name);
  return new Entity();
}

/**
 * Create Parse Query
 *
 * @export
 * @param {string} name
 * @returns Parse.Query
 */
export function query(name: string) {
  return new Reative.Parse.Query(name);
}

/**
 * Create a Parse Pointer
 *
 * @export
 * @param {string} name
 * @param {string} id
 * @returns Parse.Object
 */
export function pointer(name: string, id: string) {
  const mapping = {
    User: '_User',
    Role: '_Role',
    Session: '_Session'
  };
  return new Reative.Parse.Object(mapping[name] ? mapping[name] : name).set(
    'id',
    id
  );
}

/**
 * Create a Parse Object
 *
 * @export
 * @param {string} collection
 * @param {*} [attr={}]
 * @param {*} [options={}]
 * @returns Parse.Object
 */
export function object(collection: string, attr = {}, options = {}) {
  return new Reative.Parse.Object(collection, attr, options);
}

/**
 * Get Parse Instance
 *
 * @export
 * @returns Parse
 */
export function parse() {
  return Reative.Parse;
}

/**
 * Bootstrap Parse on Reative Platform
 *
 * @export
 * @param {*} instance
 * @param {*} options
 */
export function install(instance, options) {
  instance.initialize(options.appID);
  instance.serverURL = options.serverURL;
  instance.masterKey = options.masterKey;
  Reative.Parse = instance;
}
