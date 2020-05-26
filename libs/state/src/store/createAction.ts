export function createAction(type: string) {
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
