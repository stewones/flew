/**
 * @export
 * @interface Request
 */
export interface Request {
  id?: string; // for firestore only
  query?: any;
  size?: number; // elastic/firestore
  sort?: any | any[]; // elastic/firestore
}
