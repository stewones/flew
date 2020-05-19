import { Observable } from 'rxjs';
import { connect, ConnectOptions } from '../store/connect';

/**
 * Select data from the memoized state
 */
export function select<T>(
  key: string,
  options?: ConnectOptions
): Observable<T> {
  return connect<T>(`_memo.${key}`, options);
}
