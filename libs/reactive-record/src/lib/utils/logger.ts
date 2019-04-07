import { Subject } from 'rxjs';
import { Log, LogParams } from '../interfaces/log';
import moment from 'moment';

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
        : console.log
      : (msg: string) => this.add(msg, 'green');
  }

  public danger() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : console.log
      : (msg: string) => this.add(msg, 'red');
  }

  public warn() {
    return this.useLogTrace
      ? this.useLog === false
        ? msg => {}
        : console.log
      : (msg: string) => this.add(msg, 'yellow');
  }

  private add(msg: string, bg: string = 'green') {
    const style = `background: ${bg}; color: ${
      bg === 'yellow' ? '#333333' : '#ffffff'
    }; display: block`;

    const log =
      this.useLogTrace === true
        ? msg
        : ` <span style="${style}">${msg}</span> `;

    if (this.useLog === true) {
      console.log(`%c ${msg} `, style);
      this.subject.next(<Log>{ created: moment().toISOString(), message: log });
    }
  }

  // const err = this.getErrorObject();
  // const caller_line = err.stack.split('\n')[4];
  // const index = caller_line.indexOf('at ');
  // const caller = caller_line.slice(index + 2, caller_line.length);

  // private getErrorObject() {
  //   try {
  //     throw Error('');
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
