import { AxiosRequestConfig } from "axios";
import { PartialObserver } from "rxjs";
import { ExtraOptions } from "./extra-options";

/**
 * @export
 * @interface RRHook
 */
export interface RRHook {
    http?: {
        pre?: (config: AxiosRequestConfig) => void,
        get?: {
            before?: (key: string, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => Promise<boolean>,
            after?: (key: string, response: any, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => any
        },
        post?: {
            before?: (key: string, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => Promise<boolean>,
            after?: (key: string, response: any, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => any
        }
    },
    find?: {
        before?: (key: string, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => Promise<boolean>,
        after?: (key: string, response: any, observer: PartialObserver<any>, extraOptions?: ExtraOptions) => any,
        endpoint?: () => string
    }
    exception?: {
        server?: () => any,
        client?: () => any
    }
}