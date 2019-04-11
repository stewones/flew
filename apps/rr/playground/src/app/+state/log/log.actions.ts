import { Log } from '@firetask/reactive-record';

export class AddLog {
  public static readonly type = '[Log] Add log';
  constructor(public payload: Log) {}
}

export class ClearLog {
  public static readonly type = '[Log] Clear up all log';
  constructor() {}
}
