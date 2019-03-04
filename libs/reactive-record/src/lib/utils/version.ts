export class Version {
  /**
   * @static
   * @param {(number|string)} num
   * @param {boolean} [full=false]
   * @returns
   * @memberof Version
   */
  public static get(num: number | string, full: boolean = false) {
    const version = num ? num.toString() : '0000';
    return (
      `${version.charAt(0)}.${version.charAt(1)}.${version.charAt(2)}` +
      (full ? `.${version.charAt(3)}${version.charAt(4)}` : '')
    );
  }
}
