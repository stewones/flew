import { isNil } from 'lodash';
import { setWhere } from './setWhere';

export function where(query = [], connector) {
  const mapping = {
    id: 'objectId'
  };
  query.map(q => {
    if (isNil(q.value)) throw Error(`value can't be null for parse where`);
    if (mapping[q.field]) q.field = mapping[q.field];
    setWhere(q, connector);

    // @todo
    // this.log().success()(
    //   `parse where -> ${q.field} ${q.operator} ${
    //     q.value && q.value.id ? q.value.id : q.value
    //   }`
    // );
  });
}
