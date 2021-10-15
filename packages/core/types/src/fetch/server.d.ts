import { AxiosRequestConfig } from 'axios';
import { Observable, Subject } from 'rxjs';
import { FlewBridge } from '../interfaces/bridge';
import { FlewChainPayload } from '../interfaces/chain';
import { FlewDriverOption } from '../interfaces/driver';
import { FlewOptions } from '../interfaces/options';
import { FlewVerb } from '../interfaces/verb';
import { Log } from '../interfaces/log';
import { Logger } from '../effects/logger';
import { SetOptions } from '../interfaces/set';
/**
 * @export
 * @class FlewNetwork
 * @implements {FlewBridge}
 */
export declare class FlewNetwork implements FlewBridge {
    chain: FlewChainPayload;
    options: FlewOptions;
    protected logger: Logger;
    $log: Subject<Log>;
    constructor(options: FlewOptions);
    init(runtime?: FlewOptions): void;
    private initDrivers;
    private checkVerbAvailability;
    private checkChainAvailability;
    protected log(): Logger;
    protected createKey(verb: any, path: any, body: any): string;
    protected call<T>(method: FlewVerb, path?: string, payload?: any, chain?: FlewChainPayload, key?: string): Observable<T>;
    /**
     * Reset the chaining configuration on the fly
     *
     * @returns {FlewNetwork}
     */
    reset(): FlewNetwork;
    /**
     * Get a document
     *
     * @template T
     * @param {string} [path='']
     * @returns {Observable<T>}
     */
    get<T>(path?: string): Observable<T>;
    /**
     * Post document
     *
     * @template T
     * @param {string} [path='']
     * @param {*} [body={}]
     * @returns {Observable<T>}
     */
    post<T>(path?: string, body?: any): Observable<T>;
    /**
     * Patch a document
     *
     * @template T
     * @param {string} [path='']
     * @param {*} [body={}]
     * @returns {Observable<T>}
     */
    patch<T>(path?: string, body?: any): Observable<T>;
    /**
     * Delete a document
     *
     * @template T
     * @param {string} [path='']
     * @param {*} [body]
     * @returns {Observable<T>}
     */
    delete<T>(path?: string, body?: any): Observable<T>;
    /**
     * Find documents
     *
     * @template T
     * @returns {Observable<T>}
     */
    find<T>(): Observable<T>;
    /**
     * Same as find but only one result is returned
     *
     * @template T
     * @returns {Observable<T>}
     */
    findOne<T>(): Observable<T>;
    /**
     * Create a document
     *
     * @template T
     * @param {*} data
     * @param {SetOptions} [options]
     * @returns {Observable<T>}
     */
    set<T>(data: any, options?: SetOptions): Observable<T>;
    /**
     * Update document
     *
     * @template T
     * @param {*} data
     * @returns {Observable<T>}
     */
    update<T>(data: any): Observable<T>;
    /**
     * Get documents in realtime
     *
     * @template T
     * @returns {Observable<T>}
     */
    on<T>(): Observable<T>;
    /**
     *  Count documents
     *
     * @returns {Observable<number>}
     */
    count(): Observable<number>;
    /**
     *  Run cloud functions
     *
     * @returns {Observable<number>}
     */
    run<T>(name: string, payload: any): Observable<T>;
    /**
     * Modify the driver to be used on the fly
     *
     * @param {FlewDriverOption} driver
     * @returns {FlewNetwork}
     */
    from(driver: FlewDriverOption): FlewNetwork;
    /**
     * Modify http request config on the fly
     *
     * @param {Function} fn
     * @returns {FlewNetwork}
     * @example
     * ```ts
     * import { fetch } from '@flew/network';
     *
     * fetch('kitty', {
     *  baseURL: 'https://api.thecatapi.com',
     *  endpoint: '/v1'
     * })
     *  .http((config)=> { // modify axios config
     *    config.headers['Authorization'] = 'Bearer xyz';
     * })
     *  .get('/images/search?size=small&mime_types=gif')
     *  .subscribe(
     *    kitty => console.log(kitty),
     *    err => console.log(err)
     *  );
     *
     * ```
     */
    http(fn: (config: AxiosRequestConfig) => void): FlewNetwork;
    /**
     * Choose whether or not to make a network request
     *
     * @param {boolean} active
     * @returns {FlewNetwork}
     */
    network(active: boolean): FlewNetwork;
    /**
     * Choose whether to use memoized results
     *
     * @param {boolean} active
     * @returns {FlewNetwork}
     */
    cache(active: boolean): FlewNetwork;
    /**
     * Choose whether to use cached results
     *
     * @param {boolean} active
     * @returns {FlewNetwork}
     */
    state(active: boolean): FlewNetwork;
    /**
     * Define a custom key to be used as a identifier for the result set
     *
     * @param {string} name
     * @returns {FlewNetwork}
     */
    key(name: string): FlewNetwork;
    /**
     * Define a custom query
     *
     * @param {object} by
     * @returns {FlewNetwork}
     */
    query(by: {
        [key: string]: {};
    } | {
        [key: string]: {};
    }[]): FlewNetwork;
    /**
     * Constraint results
     *
     * @param {string} field
     * @param {string} operator
     * @param {*} value
     * @returns {FlewNetwork}
     */
    where(field: string, operator: string, value: any): FlewNetwork;
    /**
     * Sort data
     *
     * @param {object} by
     * @returns {FlewNetwork}
     */
    sort(by: {
        [key: string]: string;
    }): FlewNetwork;
    /**
     * Define the size of results
     *
     * @param {number} value
     * @returns {FlewNetwork}
     */
    size(value: number): FlewNetwork;
    /**
     * Set an at pointer for the request
     *
     * @param {*} value
     * @returns {FlewNetwork}
     */
    at(value: any): FlewNetwork;
    /**
     * Set an after pointer for the request
     *
     * @param {*} value
     * @returns {FlewNetwork}
     */
    after(value: any): FlewNetwork;
    /**
     * Define a document path for a request
     *
     * @param {string} path
     * @returns {FlewNetwork}
     */
    ref(path: string): FlewNetwork;
    /**
     * Define a document id for the request
     *
     * @param {*} value
     * @returns {FlewNetwork}
     */
    doc(value: any): FlewNetwork;
    /**
     * Populate query fields
     *
     * @param {string[]} fields
     * @returns {FlewNetwork}
     */
    include(fields: string[]): FlewNetwork;
    /**
     * Set useMasterKey on the request
     *
     * @param {boolean} active
     * @returns {FlewNetwork}
     */
    master(active: boolean): FlewNetwork;
    /**
     * Set a session token for the request
     *
     * @param {string} session
     * @returns {FlewNetwork}
     */
    token(session: string): FlewNetwork;
    /**
     * Result as real objects
     *
     * @param {boolean} active
     * @returns {FlewNetwork}
     */
    object(active: boolean): FlewNetwork;
    /**
     * Select custom fields
     *
     * @param {string[]} value
     * @returns {FlewNetwork}
     */
    select(value: string[]): FlewNetwork;
    /**
     * Near geo query
     *
     * @example
     * fetch('locations').near('locationField', geopoint(40.0, -30.0)).find()
     * @param {string} field
     * @param {Parse.GeoPoint} geopoint
     * @param {ParseOptions.GeoPoint} geopoint
     * @returns {FlewNetwork}
     */
    near(field: string, geopoint: any): FlewNetwork;
    /**
     * Within Kilometers
     *
     * @example
     * fetch('locations').withinKilometers('locationField', geopoint(40.0, -30.0)).find()
     * @param {string} active
     * @param {ParseOptions.GeoPoint} geopoint
     * @param {number} maxDistance
     * @param {boolean} sorted
     * @returns {FlewNetwork}
     */
    withinKilometers(field: string, geopoint: any, maxDistance?: number, sorted?: boolean): FlewNetwork;
    /**
     * Within Miles
     *
     * @example
     * fetch('locations').withinMiles('locationField', geopoint(40.0, -30.0)).find()
     * will return a field
     * @param {string} active
     * @param {ParseOptions.GeoPoint} geopoint
     * @param {number} maxDistance
     * @param {boolean} sorted
     * @returns {FlewNetwork}
     */
    withinMiles(field: string, geopoint: any, maxDistance?: number, sorted?: boolean): FlewNetwork;
    /**
     * diff function callback
     *
     * @param {*} fn
     * @returns {FlewNetwork}
     * @memberof FlewNetwork
     */
    diff(fn: any): FlewNetwork;
    /**
     * network response callback
     *
     * @param {*} fn
     * @returns {FlewNetwork}
     * @memberof FlewNetwork
     */
    response(fn: any): FlewNetwork;
}
export declare class FetchServer extends FlewNetwork {
}
