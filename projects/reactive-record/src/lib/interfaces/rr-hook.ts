import { AxiosRequestConfig } from "axios";
import { PartialObserver } from "rxjs";
import { ExtraOptions } from "./extra-options";
import { RRResponse } from "./rr-response";

/**
 * @export
 * @interface RRHook
 */
export interface RRHook {
    http?: {
        pre?: (config: AxiosRequestConfig) => void,
        get?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => any
        },
        post?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => any
        },
        patch?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => any
        }
    },
    find?: {
        before?: (key: string, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => Promise<boolean>,
        after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, extraOptions?: ExtraOptions) => any,
        endpoint?: () => string
    }
    exception?: {
        server?: () => any,
        client?: () => any
    }
}