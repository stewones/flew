import { RebasedDriverOption } from '@rebased/core';

export interface TodoFindOptions {
  useMemo?: boolean;
  useCache?: boolean;
  useNetwork?: boolean;
  driver?: RebasedDriverOption;
  pathname?: string;
}
