import { Observable } from 'rxjs';
import { connect, ConnectOptions, StateMeta } from '../store/connect';

/**
 * Select data from the memoized state
 */
export function select<T>(
  key: string,
  options?: ConnectOptions
): Observable<T & StateMeta<T>> {
  return connect<T>(`_memo.${key}`, options);
}
