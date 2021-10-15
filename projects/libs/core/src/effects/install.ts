import { Rebased } from '../symbols/rebased';
import { RebasedOptions } from '../interfaces';

/**
 * Rebased Core Install
 *
 * @export
 * @param {RebasedOptions} options
 */
export function install(options: RebasedOptions) {
  for (const k in options) {
    Rebased.options[k] = options[k];
  }
}
