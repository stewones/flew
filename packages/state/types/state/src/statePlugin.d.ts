export interface FlewStateOptions {
    production?: boolean;
    reducers?: any;
    state?: any;
    trace?: boolean;
    traceLimit?: number;
    enhancers?: any;
}
/**
 * Bootstrap state stuff for Flew
 *
 * @export
 */
export declare function statePlugin(options: FlewStateOptions): () => void;
