export declare type FlewRequestMethod = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
export declare type FlewRequestHeaders = Record<string, string>;
export declare type FlewResponseHeaders = Record<string, string> & {
    'set-cookie'?: string[];
};
export interface FlewResponseTransformer {
    (data: any, headers?: FlewResponseHeaders): any;
}
export interface FlewRequestTransformer {
    (data: any, headers?: FlewRequestHeaders): any;
}
export interface FlewPromise<T = unknown> extends Promise<FlewResponse<T>> {
}
export interface FlewAdapter {
    (config: FlewRequestConfig): FlewPromise<any>;
}
export interface FlewResponse<T = unknown, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: FlewResponseHeaders;
    config: FlewRequestConfig<D>;
    request?: any;
}
export interface FlewBasicCredentials {
    username: string;
    password: string;
}
export interface FlewProxyConfig {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
}
export interface Cancel {
    message: string;
}
export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}
export interface TransitionalOptions {
    silentJSONParsing?: boolean;
    forcedJSONParsing?: boolean;
    clarifyTimeoutError?: boolean;
}
export interface FlewRequestConfig<D = any> {
    url?: string;
    method?: FlewRequestMethod;
    baseURL?: string;
    transformRequest?: FlewRequestTransformer | FlewRequestTransformer[];
    transformResponse?: FlewResponseTransformer | FlewResponseTransformer[];
    headers?: FlewRequestHeaders;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: D;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: FlewAdapter;
    auth?: FlewBasicCredentials;
    responseType?: ResponseType;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: FlewProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;
    transitional?: TransitionalOptions;
    signal?: AbortSignal;
    insecureHTTPParser?: boolean;
}
