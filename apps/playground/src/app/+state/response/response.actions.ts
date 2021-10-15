import { PlayResponse } from '../../interfaces/play.interface';

export class AddResponse {
  public static readonly type = '[Response] Add response from collection';
  constructor(public payload: PlayResponse) {}
}

export class ClearResponse {
  public static readonly type = '[Response] Clear up all collection responses';
  constructor() {}
}
