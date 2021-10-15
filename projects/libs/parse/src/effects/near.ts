import { isEmpty } from 'lodash';

export interface NearOptions {
  field: string;
  geopoint: any;
}

/**
 * Apply near on query
 *
 * @export
 * @param {NearOptions} it
 * @param {*} connector
 */
export function near(it: NearOptions, connector: any) {
  //
  // Validate - must have field and geopoint
  if (isEmpty(it) || (it && !it.field) || (it && !it.geopoint)) return;
  connector.near(it.field, it.geopoint);
}
