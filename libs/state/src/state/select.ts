import { Observable } from 'rxjs';
import { connect } from '../store/connect';

/**
 * Select data from the memoized state
 */
export function select<T>(key: string, raw?: boolean): Observable<T> {
  return connect(`memo.${key}`, { raw: raw });
}
