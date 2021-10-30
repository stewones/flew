import lodash from 'lodash';
const { isEmpty } = lodash;
import { diff } from './diff';

export function isDiff(from_, to_): any {
  return isEmpty(from_) && !isEmpty(to_)
    ? true
    : isEmpty(from_) && isEmpty(to_)
    ? true
    : from_?.length !== to_?.length
    ? true
    : !isEmpty(diff(from_, to_));
}
