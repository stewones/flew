
/**
 * @export
 * @interface ElasticMatch
 */
export interface ElasticMatch {
    term: any,
    range: any,                       // { "gte" : 10, "lte" : 20 }
    match: any
}
