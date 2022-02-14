import { Subject } from 'rxjs';
export interface Log {
    created: string;
    message: string;
}
export interface LogParams {
    silent: boolean;
    subject: Subject<Log>;
}
