/**
 * @export
 * @interface FirestoreQuery
 */
export interface FirestoreQuery {
  field: string; // can also be any deeply property like 'foo.deeply.property'
  operator: string; // == or != or array-contains
  value: string | number | boolean;
}
