export interface NearOptions {
    field: string;
    geopoint: any;
}
/**
 * Apply near on query
 *
 * @export
 * @param {NearOptions} it
 * @param {*} connector
 */
export declare function near(it: NearOptions, connector: any): void;
