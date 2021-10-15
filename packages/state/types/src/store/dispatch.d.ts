export interface Action {
    type: string;
    payload: any;
}
/**
 * Action dispatcher
 *
 * @export
 * @param {Action} action
 * @returns {any}
 */
export declare function dispatch(action: Action & any): any;
