/**
 * @export
 * @interface RRRequest
 */
export interface RRRequest {
    id?: string,                      // for firestore only
    query?: any,
    size?: number,                    // for elastic @todo add firestore
    sort?: any | any[]                // for elastic @todo add firestore
}
