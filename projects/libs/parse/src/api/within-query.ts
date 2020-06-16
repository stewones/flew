import { isEmpty } from 'lodash';

export function withinQuery(
  it: {
    field: string;
    geopoint: any;
    maxDistance: number;
    sorted: boolean;
    method: string; // withinKilometers or withinMiles
  },
  connector: any
) {
  //
  // Validate - must have field, geopoint and method
  if (
    isEmpty(it) ||
    (it && !it.field) ||
    (it && !it.geopoint) ||
    (it && !it.method)
  )
    return;

  //
  // Create array of params
  const params: (string | number | boolean)[] = [it.field, it.geopoint];

  //
  // Add optional params
  if (it && it.maxDistance) params.push(it.maxDistance);
  if (it && it.sorted) params.push(it.sorted);

  connector[it.method](...params);
}
