export interface RRExtraOptions {
    ttl?: number,                            // time to live (in seconds. default: 0)
    key?: string,                            // key used to cache. defaults to requested path
    useCache?: boolean,
    useNetwork?: boolean,
    saveNetwork?: boolean,
    disableHook?: string[] & any,            // disable any hook. eg: http.post.before
    transformCache?: (data: any) => any      // transform function for cache data
    transformNetwork?: (data: any) => any    // transform function for network data response
}