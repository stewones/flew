import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { FlewNetwork } from '../fetch/server';
import { FlewOptions } from './options';
/**
 * Flew public api
 *
 * @export
 * @interface FlewBridge
 */
export interface FlewBridge {
    options: FlewOptions;
    reset(): FlewNetwork;
    from(driver: string): FlewNetwork;
    network(active: boolean): FlewNetwork;
    cache(active: boolean): FlewNetwork;
    state(active: boolean): FlewNetwork;
    key(name: string): FlewNetwork;
    query(by: {
        [key: string]: {};
    } | {
        [key: string]: {};
    }[]): FlewNetwork;
    where(field: string, operator: string, value: string | number | boolean | []): FlewNetwork;
    sort(by: {
        [key: string]: string;
    }): FlewNetwork;
    size(value: number): FlewNetwork;
    at(value: string | number): FlewNetwork;
    after(value: string | number): FlewNetwork;
    ref(path: string): FlewNetwork;
    http(transformFn: (config: AxiosRequestConfig) => void): FlewNetwork;
    token(session: string): FlewNetwork;
    find<T>(): Observable<T>;
    findOne<T>(): Observable<T>;
    set<T>(data: any, options?: any): Observable<T>;
    update<T>(data: any): Observable<T>;
    on<T>(): Observable<T>;
    count(): Observable<number>;
    run<T>(name: string, payload: any): Observable<T>;
    get<T>(path: string): Observable<T>;
    post<T>(path: string, body: any): Observable<T>;
    patch<T>(path: string, body: any): Observable<T>;
    delete<T>(path?: string, body?: any): Observable<T>;
    include(fields: string[]): FlewNetwork;
    doc(value: any): FlewNetwork;
    select(value: string[]): FlewNetwork;
    master(value: boolean): FlewNetwork;
}
