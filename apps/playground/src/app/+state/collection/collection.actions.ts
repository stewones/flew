export class UpdateCollection {
  public static readonly type = '[Collection] Update selected collection';
  constructor(public payload: string) {}
}
