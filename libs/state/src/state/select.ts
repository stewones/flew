import { Observable } from 'rxjs';
import { connect } from '../store/connect';

/**
 * Select data from Reative State
 * @deprecated replace with the connect(path) function
 */
export function select<T>(key: string, raw?: boolean): Observable<T> {
  return connect(`memo.${key}`);
}
