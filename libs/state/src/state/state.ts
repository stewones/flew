export interface SetStateOptions {
  save?: boolean;
  /**
   * @deprecated no replacement
   */
  identifier?: string;
  /**
   * @deprecated no replacement
   */
  merge?: boolean;
  /**
   * @deprecated no replacement
   */
  path?: string;
}

export interface GetStateOptions {
  raw?: boolean;
  /**
   * @deprecated no replacement
   */
  mutable?: boolean;
  /**
   * @deprecated no replacement
   */
  feed?: boolean;
}

export const defaultStateOptions: SetStateOptions = {
  save: true
};
