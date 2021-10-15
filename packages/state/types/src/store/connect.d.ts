import { Observable } from 'rxjs';
export interface ConnectOptions {
    context: boolean;
    fetch: boolean;
    readonly: boolean;
}
export interface StateContext<T = any> {
    path: string;
    prev: T;
    next: T;
}
/**
 * Provides reactive data access through observables
 *
 * @export
 * @template T
 * @param {string} path
 * @param {Partial<ConnectOptions>} [options={
 *     context: false,
 *     fetch: false
 *   }]
 * @returns {Observable<T>}
 */
export declare function connect<T>(path: string, options?: Partial<ConnectOptions>): Observable<T>;
