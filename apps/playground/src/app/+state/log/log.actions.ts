import { Log } from '@reative/core';

export class AddLog {
  public static readonly type = '[Log] Add log';
  constructor(public payload: Log) {}
}

export class ClearLog {
  public static readonly type = '[Log] Clear up any log';
  constructor() {}
}
