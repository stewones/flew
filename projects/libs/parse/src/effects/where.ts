import { setWhere } from './setWhere';

export function where(query = [], connector) {
  const mapping = {
    id: 'objectId'
  };
  query.map(q => {
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
