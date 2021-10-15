export function createAction<T = any>(
  type: string
): (
  payload?: Partial<T>,
  ...args
) => { type: string; payload?: Partial<T>; [key: string]: any } {
  return (payload, ...args) => {
    let meta = {
      type: type,
      payload: payload
    };

    for (const k in args) {
      meta = {
        ...meta,
        ...args[k]
      };
    }

    return meta;
  };
}
