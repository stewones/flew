import { parse } from './parse';

/**
 * Apply geopoint on query
 *
 * @export
 * @param {number} lat
 * @param {number} lng
 * @returns {Parse}
 */
export function geopoint(lat: number, lng: number) {
  const Parse = parse();
  return new Parse.GeoPoint({ latitude: lat, longitude: lng });
}
