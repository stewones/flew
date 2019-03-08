import { merge, get, set } from 'lodash';
import { AxiosRequestConfig } from 'axios';

import { Hook } from '../interfaces/hook';
import { Options } from '../interfaces/options';

export class Hooks {
  //
  // hooks
  public hook: Hook = {
    http: {
      pre: (config: AxiosRequestConfig) => {}
    }
  };

  constructor(options: Options) {
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
    const hookFn = this.hasHook(path);
    return hookFn ? hookFn(...args) : false;
  }

  /**
   * check whether the hook exists or not
   *
   * @param {string} path
   * @returns {(boolean | any)}
   * @memberof RR
   */
  public hasHook(path: string): boolean | any {
    const hookFn = get(this.hook, path, false);
    return hookFn && typeof hookFn === 'function' ? hookFn : false;
  }
}
