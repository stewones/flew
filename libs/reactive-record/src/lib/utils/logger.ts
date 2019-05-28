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

  public success(force?) {
    if (force) return (msg: string) => this.log(msg, this.style('green'));
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'success')
      : (msg: string) => this.add(msg, 'green');
  }

  public info(force?) {
    if (force) return (msg: string) => this.log(msg, this.style('deepskyblue'));
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'info')
      : (msg: string) => this.add(msg, 'deepskyblue');
  }

  public danger(force?) {
    if (force) return (msg: string) => this.log(msg, this.style('red'));
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'danger')
      : (msg: string) => this.add(msg, 'red');
  }

  public warn(force?) {
    if (force) return (msg: string) => this.log(msg, this.style('yellow'));
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : msg => this.trace(msg, 'warn')
      : (msg: string) => this.add(msg, 'yellow');
  }

  private add(msg: string, bg: string = 'green') {
    const style = this.style(bg);

    const log =
      this.useLogTrace === true
        ? msg
        : ` <span style="${style}">${msg}</span> `;

    if (this.useLog === true) {
      if (isServer()) return console.log(msg);
      this.log(msg, style);
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

  private log(msg, style) {
    if (isServer()) return console.log(msg);
    return console.log(`%c ${msg} `, style);
  }

  private style(bg) {
    return `background: ${bg}; color: ${
      bg === 'yellow' || bg === 'deepskyblue' ? '#333333' : '#ffffff'
    }; display: block`;
  }
}
