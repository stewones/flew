/**
 * Generate a Globally Unique Identifier
 */
export class Guid {
  static s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  static make(size: number = -1): string {
    return size === 1
      ? Guid.s4()
      : size === 2
      ? Guid.s4() + Guid.s4()
      : Guid.s4() +
        Guid.s4() +
        '-' +
        Guid.s4() +
        '-' +
        Guid.s4() +
        '-' +
        Guid.s4() +
        '-' +
        Guid.s4() +
        Guid.s4() +
        Guid.s4();
  }
}
