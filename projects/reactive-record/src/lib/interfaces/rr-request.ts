import { FirestoreQuery } from "./firestore-query";
import { ElasticQuery } from "./elastic-query";

/**
 * @export
 * @interface RRRequest
 */
export interface RRRequest {
    id?: string,                      // for firestore only
    query?: FirestoreQuery[] | FirestoreQuery | ElasticQuery,
    size?: number,                    // for elastic @todo add firestore
    sort?: any | any[]                // for elastic @todo add firestore
}
