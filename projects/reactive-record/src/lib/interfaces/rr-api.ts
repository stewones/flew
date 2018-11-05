
/**
 * Public RR Api
 *
 * @export
 * @interface RRApi
 */
export interface RRApi {
    driver(name: string),
    network(active: boolean),
    networkTransform(transformFn: (data: any[]) => any),
    ttl(value: number),
    cache(active: boolean),
    cacheTransform(transformFn: (data: any[]) => any),
    key(name: string),
    query(by: { [key: string]: {} }),
    where(field: string, operator: string, value: string | number),
    sort(by: { [key: string]: string }),
    size(value: number)    
}