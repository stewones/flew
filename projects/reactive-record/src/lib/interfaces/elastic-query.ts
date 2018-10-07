import { ElasticMatch } from "./elastic-match";

/**
 * @export
 * @interface ElasticQuery
 */
export interface ElasticQuery {
    nested?: {
        path: string,
        score_mode?: string,            // eg: avg
        query: ElasticQuery
    },
    bool?: {
        must: ElasticMatch | ElasticMatch[],
        must_not: ElasticMatch | ElasticMatch[],
        filter: ElasticMatch,
        should: ElasticMatch | ElasticMatch[],
        minimum_should_match?: number,  // eg: 1
        boost: number                   // eg: 1.0
    }
}