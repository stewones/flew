import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { FlewOptions } from './options';
/**
 * Flew public api
 *
 * @export
 * @interface FlewBridge
 * @deprecated
 */
export interface FlewBridge {
    options: FlewOptions;
    reset(): FlewBridge;
    from(driver: string): FlewBridge;
    network(active: boolean): FlewBridge;
    cache(active: boolean): FlewBridge;
    state(active: boolean): FlewBridge;
    key(name: string): FlewBridge;
    query(by: {
        [key: string]: {};
    } | {
        [key: string]: {};
    }[]): FlewBridge;
    where(field: string, operator: string, value: string | number | boolean | []): FlewBridge;
    sort(by: {
        [key: string]: string;
    }): FlewBridge;
    size(value: number): FlewBridge;
    at(value: string | number): FlewBridge;
    after(value: string | number): FlewBridge;
    ref(path: string): FlewBridge;
    http(transformFn: (config: AxiosRequestConfig) => void): FlewBridge;
    token(session: string): FlewBridge;
    diff(compareFn: (cache: any, network: any) => boolean): FlewBridge;
    response(responseFn: (network: any) => void): FlewBridge;
    get(id?: string): Observable<any>;
    post(data: any): Observable<any>;
    put(id: string, data: any): Observable<any>;
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
    include(fields: string[]): FlewBridge;
    doc(value: any): FlewBridge;
    select(value: string[]): FlewBridge;
    master(value: boolean): FlewBridge;
}
