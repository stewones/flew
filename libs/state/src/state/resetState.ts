import { dispatch } from '../store/dispatch';

/**
 * Fully reset current state
 *
 * @export
 */
export function resetState() {
  dispatch({
    type: 'MEMO_RESET'
  });
}
