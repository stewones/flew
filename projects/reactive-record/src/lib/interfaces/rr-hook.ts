import { AxiosRequestConfig } from "axios";
import { PartialObserver } from "rxjs";
import { RRExtraOptions } from "./rr-extra-options";
import { RRResponse } from "./rr-response";

/**
 * @export
 * @interface RRHook
 */
export interface RRHook {
    http?: {
        pre?: (config: AxiosRequestConfig) => void,
        get?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => any
        },
        post?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => any
        },
        patch?: {
            before?: (key: string, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => Promise<boolean>,
            after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => any
        }
    },
    find?: {
        before?: (key: string, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => Promise<boolean>,
        after?: (key: string, response: RRResponse&{ttl: number}, observer: PartialObserver<RRResponse>, RRExtraOptions?: RRExtraOptions) => any,
        endpoint?: () => string
    }
    // @deprecated
    exception?: {
        server?: () => any,
        client?: () => any
    }
}