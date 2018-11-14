import { RRRequest } from "./rr-request";
import { RRExtraOptions } from "./rr-extra-options";
import { RRResponse } from "./rr-response";
import { Observable } from "rxjs";

/**
 * Public RR Api
 *
 * @export
 * @interface RRApi
 */
export interface RRApi {
    //
    // chaining
    driver(name: string),
    useNetwork(active: boolean),
    saveNetwork(active: boolean),
    transformNetwork(transformFn: (response: RRResponse) => any),
    ttl(value: number),
    useCache(active: boolean),
    transformCache(transformFn: (response: RRResponse) => any),
    key(name: string),
    query(by: { [key: string]: {} }),
    where(field: string, operator: string, value: string | number),
    sort(by: { [key: string]: string }),
    size(value: number),

    //
    // data
    find(request: RRRequest, extraOptions?: RRExtraOptions, driver?: string): Observable<RRResponse>,
    findOne(request: RRRequest, extraOptions?: RRExtraOptions, driver?: string): Observable<RRResponse>,
    set(id: string, data: any, driver?: string, merge?: boolean): Observable<any>,
    update(id: string, data: any, driver?: string): Observable<any>,
    on(request: RRRequest, onSuccess: (response: RRResponse) => any, onError: (response: any) => any, driver?: string): any,

    //
    // http
    get(path: string, extraOptions?: RRExtraOptions): Observable<RRResponse>,
    post(path: string, body: any, extraOptions?: RRExtraOptions): Observable<RRResponse>,
    patch(path: string, body: any, extraOptions?: RRExtraOptions): Observable<RRResponse>
}