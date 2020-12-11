import Parse from 'parse';
import { Rebased } from '@rebased/core';
import { ParseDriver } from '../driver/parse';

const mapping = {
  User: '_User',
  Role: '_Role',
  Session: '_Session'
};

/**
 * Extends Parse Object
 *
 * @export
 * @param {string} name
 * @returns Parse.Object
 */
export function model(name: string) {
  const Parse = parse();
  const Entity = Parse.Object.extend(mapping[name] ? mapping[name] : name);
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
  const Parse = parse();
  return new Parse.Query(mapping[name] ? mapping[name] : name);
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
  const Parse = parse();
  return new Parse.Object(mapping[name] ? mapping[name] : name).set('id', id);
}

/**
 * Creates a Parse Geo Point
 *
 * @example
 * // returns Parse.Geopoint(40.0, -30.0)
 * geopoint(40.0, -30.0)
 * @export
 * @param {number} lat
 * @param {number} lng
 * @returns Parse.GeoPoint
 */
export function geopoint(lat: number, lng: number) {
  const Parse = parse();
  return new Parse.GeoPoint({ latitude: lat, longitude: lng });
}

/**
 * Creates a Parse Object
 *
 * @export
 * @param {string} from
 * @param {*} [attr={}]
 * @param {*} [options={}]
 * @returns Parse.Object
 */
export function object(from: string, attr = {}, options = {}) {
  const Parse = parse();
  return new Parse.Object(mapping[from] ? mapping[from] : from, attr, options);
}

/**
 * Get the Parse instance
 *
 * @export
 * @returns Parse
 */
export function parse() {
  return Rebased.driver.parse.getInstance();
}

/**
 * Bootstraps Parse on Rebased
 *
 * @export
 * @param {*} sdk
 * @param {*} config
 * @returns RebasedParse
 */
export function install(config) {
  const sdk = Parse;
  const isDriverAvailable = Rebased.drivers.find(it => it === 'parse');
  if (!isDriverAvailable) {
    Rebased.drivers = [...Rebased.drivers, 'parse'];
  }

  sdk.initialize(config.appID);
  sdk.serverURL = config.serverURL;
  sdk.masterKey = config.masterKey;
  Rebased.driver.parse = new ParseDriver({
    serverURL: sdk.serverURL,
    appID: config.appID,
    instance: sdk.Parse
  });

  return parse();
}
