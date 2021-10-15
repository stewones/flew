import { LogParams } from '../structurelog';
export declare class Logger {
    private silent;
    private subject;
    constructor(params: LogParams);
    /**
     * Getter/setter to set active state
     */
    enabled(active?: boolean): boolean | void;
    success(force?: any): (msg: string) => void;
    info(force?: any): (msg: string) => void;
    danger(force?: any): (msg: string) => void;
    warn(force?: any): (msg: string) => void;
    private add;
    private log;
    private style;
}
