/**
 * @export
 * @interface Request
 */
export interface Request {
  id?: string; // for firestore only
  query?: any;
  size?: number; // for elastic @todo add firestore
  sort?: any | any[]; // for elastic @todo add firestore
}

export interface RRRequest extends Request {}
