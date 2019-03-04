/**
 * @export
 * @interface RRResponse
 */
export interface RRResponse {
  data: any | any[]; // formatted data response
  response: any; // generic response from driver
  key?: string; // key used for cache
}
