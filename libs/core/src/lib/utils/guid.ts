/**
 * Generate a Globally Unique Identifier
 *
 * @export
 * @class Guid
 */
export class Guid {
  /**
   *
   *
   * @static
   * @returns {string}
   * @memberof Guid
   */
  static s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  /**
   * Make a new GUID
   *
   * @static
   * @param {number} [size=-1]
   * @returns {string}
   * @memberof Guid
   */
  static make(size: number = -1): string {
    return size === 1
      ? this.s4()
      : size === 2
      ? this.s4() + this.s4()
      : this.s4() +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        '-' +
        this.s4() +
        this.s4() +
        this.s4();
  }
}
