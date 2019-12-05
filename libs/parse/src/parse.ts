import { Reative } from '@reative/core';

const mapping = {
  User: '_User',
  Role: '_Role',
  Session: '_Session'
};

export interface ParseOptions {
  serverURL: string;
  appID: string;
  masterKey?: string;
}

/**
 * Extends Parse Object
 *
 * @export
 * @param {string} name
 * @returns Parse.Object
 */
export function model(name: string) {
  const Entity = Reative.Parse.Object.extend(
    mapping[name] ? mapping[name] : name
  );
  return new Entity();
}

/**
 * Creates a Parse Query
 *
 * @export
 * @param {string} name
 * @returns Parse.Query
 */
export function query(name: string) {
  return new Reative.Parse.Query(mapping[name] ? mapping[name] : name);
}

/**
 * Creates a Parse Pointer
 *
 * @export
 * @param {string} name
 * @param {string} id
 * @returns Parse.Object
 */
export function pointer(name: string, id: string) {
  return new Reative.Parse.Object(mapping[name] ? mapping[name] : name).set(
    'id',
    id
  );
}

/**
 * Creates a Parse Object
 *
 * @export
 * @param {string} collection
 * @param {*} [attr={}]
 * @param {*} [options={}]
 * @returns Parse.Object
 */
export function object(collection: string, attr = {}, options = {}) {
  return new Reative.Parse.Object(
    mapping[collection] ? mapping[collection] : collection,
    attr,
    options
  );
}

/**
 * Get the Parse instance
 *
 * @export
 * @returns Parse
 */
export function parse() {
  return Reative.Parse;
}

/**
 * Bootstraps Parse on Reative Platform
 *
 * @export
 * @param {*} instance
 * @param {*} options
 */
export function install(instance, options, ReativePlatform?) {
  instance.initialize(options.appID);
  instance.serverURL = options.serverURL;
  instance.masterKey = options.masterKey;
  if (ReativePlatform) {
    ReativePlatform.Parse = instance;
  } else {
    Reative.Parse = instance;
  }
}
