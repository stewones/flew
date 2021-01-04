import { isEmpty } from 'lodash';

export function select(it: string[], connector: any) {
  if (isEmpty(it)) return;
  connector.select(...it);
}
