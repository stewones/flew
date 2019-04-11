import { PlayMethod } from '../../interfaces/method.interface';

export class AddMethod {
  public static readonly type = '[Method] Add method to chain';
  constructor(public payload: PlayMethod) {}
}

export class RemoveMethod {
  public static readonly type = '[Method] Remove method from chain';
  constructor(public payload: PlayMethod) {}
}

export class RemoveAllMethods {
  public static readonly type = '[Method] Remove all methods from chain';
  constructor(public payload: PlayMethod) {}
}

export class UpdateMethod {
  public static readonly type = '[Method] Update method from chain';
  constructor(public payload: PlayMethod) {}
}

export class UpdateVerb {
  public static readonly type = '[Method] Update verb from chain';
  constructor(public payload: PlayMethod) {}
}
