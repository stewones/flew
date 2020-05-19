import { isEmpty } from 'lodash';

export function near(it: { field: string; geopoint: any }, connector: any) {
  //
  // Validate - must have field and geopoint
  if (isEmpty(it) || !it?.field || !it?.geopoint) return;
  connector.near(it.field, it.geopoint);
}
