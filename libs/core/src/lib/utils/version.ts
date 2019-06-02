export class Version {
  /**
   * @static
   * @param {(number|string)} num
   * @param {boolean} [full=false]
   * @returns
   * @memberof Version
   */
  public static get(num: number | string, full = false) {
    const version = num
      ? num
          .toString()
          .split('.')
          .join('')
          .split('~')
          .join('')
      : '0000';
    return (
      `${version.charAt(0)}.${version.charAt(1)}.${version.charAt(2)}` +
      (full ? `.${version.charAt(3)}${version.charAt(4)}` : '')
    );
  }

  public static footer(version, environment, full = true): string {
    return `
    <small style="color: #ccc">${Version.get(version, full)} ${
      environment.testing ? '(test)' : environment.staging ? '(staging)' : ''
    }</small>
    `;
  }
}
