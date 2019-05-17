/* istanbul ignore file */

import { Subject } from 'rxjs';
import { Log, LogParams } from '../interfaces/log';
import { isServer } from './platform';

export class Logger {
  private useLog: boolean;
  private useLogTrace: boolean;

  private subject: Subject<Log> = new Subject();

  constructor(params: LogParams) {
    Object.assign(this, params);
  }

  /**
   * Getter/setter to set active state
   */
  public enabled(active?: boolean): boolean | void {
    return active || active === false ? (this.useLog = active) : this.useLog;
  }

  /**
   * Getter/setter to set trace state
   */
  public traced(active?: boolean): boolean | void {
    return active || active === false
      ? (this.useLogTrace = active)
      : this.useLogTrace;
  }

  public success() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'success')
      : (msg: string) => this.add(msg, 'green');
  }

  public info() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'info')
      : (msg: string) => this.add(msg, 'deepskyblue');
  }

  public danger() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'danger')
      : (msg: string) => this.add(msg, 'red');
  }

  public warn() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'warn')
      : (msg: string) => this.add(msg, 'yellow');
  }

  private add(msg: string, bg: string = 'green') {
    const style = `background: ${bg}; color: ${
      bg === 'yellow' || bg === 'deepskyblue' ? '#333333' : '#ffffff'
    }; display: block`;

    const log =
      this.useLogTrace === true
        ? msg
        : ` <span style="${style}">${msg}</span> `;

    if (this.useLog === true) {
      if (isServer()) return console.log(msg);
      console.log(`%c ${msg} `, style);
      this.subject.next(<Log>{
        created: new Date().toISOString(),
        message: log
      });
    }
  }

  private trace(msg, type) {
    if (isServer()) return console.log(msg);
    console.groupCollapsed(`${type} | ${msg}`);
    console.trace(msg);
    console.groupEnd();
  }
}
