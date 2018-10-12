import { ElasticMatch } from "./elastic-match";

/**
 * @export
 * @interface ElasticQuery
 */
export interface ElasticQuery {
    size?: number,
    sort?: any,                         // eg: { "created_at": { "order": "desc" } }
    aggs?: any,                         // see elastic aggs docs
    range?: any,                        // see elastic range docs
    bool?: any,                         // see elastic bool docs
    nested?: {
        path: string,
        score_mode?: string,            // eg: avg
        query: ElasticQuery
    },
    // @todo better typing
    // bool?: {
    //     must: ElasticMatch | ElasticMatch[],
    //     must_not: ElasticMatch | ElasticMatch[],
    //     filter: ElasticMatch,
    //     should: ElasticMatch | ElasticMatch[],
    //     minimum_should_match?: number,  // eg: 1
    //     boost: number                   // eg: 1.0
    // }
}