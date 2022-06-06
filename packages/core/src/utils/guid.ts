export function guid(size = -1) {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return size === 1
    ? s4()
    : size === 2
    ? s4() + s4()
    : size === 3
    ? s4() + s4() + s4()
    : size === 4
    ? s4() + s4() + s4() + s4()
    : s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4();
}
