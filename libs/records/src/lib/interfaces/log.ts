import { Subject } from 'rxjs';

export interface Log {
  created: string;
  message: string;
}

export interface LogParams {
  useLog: boolean;
  useLogTrace: boolean;
  subject: Subject<Log>;
}
