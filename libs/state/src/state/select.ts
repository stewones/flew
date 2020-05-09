import { Observable } from 'rxjs';
import { connect, ConnectOptions, StateContext } from '../store/connect';

/**
 * Select data from the memoized state
 */
export function select<T>(
  key: string,
  options?: ConnectOptions
): Observable<T & StateContext<T>> {
  return connect<T>(`_memo.${key}`, options);
}
