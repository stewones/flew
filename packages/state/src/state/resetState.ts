import { dispatch } from '../store/dispatch';

/**
 * Fully reset current fetch state
 *
 * @export
 */
export function resetState() {
  dispatch({
    type: 'networkStateReset',
  });
}
