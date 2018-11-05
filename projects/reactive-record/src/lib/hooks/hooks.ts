import { merge, get, set } from 'lodash';
import { AxiosRequestConfig } from 'axios';

import { RRHook } from "../interfaces/rr-hook";
import { RROptions } from "../interfaces/rr-options";

export class RRHooks {
    //
    // hooks
    public hook: RRHook = {
        http: {
            pre: (config: AxiosRequestConfig) => { }
        }
    };

    constructor(options: RROptions) {
        merge(this, options);
    }

    /**
     * set hooks
     * call httpSetup() after adding any http hook
     *
     * @param {string} path
     * @param {*} hook
     * @memberof RR
     */
    public setHook(path: string, hook: any) {
        set(this.hook, path, hook);
    }

    /**
     * run hooks
     *
     * @param {string} path
     * @param {*} args
     * @returns {(boolean | any)}
     * @memberof RR
     */
    public runHook(path: string, ...args): boolean | any {
        const hook = this.hasHook(path);
        return hook ? hook(...args) : false;
    }

    /**
     * check whether the hook exists or not
     *
     * @param {string} path
     * @returns {(boolean | any)}
     * @memberof RR
     */
    public hasHook(path: string): boolean | any {
        const hook = get(this.hook, path, false);
        return hook && typeof hook === 'function' ? hook : false;
    }
}