import { parse } from './parse';

export function geopoint(lat: number, lng: number) {
  const Parse = parse();
  return new Parse.GeoPoint({ latitude: lat, longitude: lng });
}
