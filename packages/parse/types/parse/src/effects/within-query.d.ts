export interface WithInQueryOptions {
    field: string;
    geopoint: any;
    maxDistance: number;
    sorted: boolean;
    method: string;
}
/**
 * Apply withinQuery
 *
 * @export
 * @param {WithInQueryOptions} it
 * @param {*} connector
 */
export declare function withinQuery(it: WithInQueryOptions, connector: any): void;
