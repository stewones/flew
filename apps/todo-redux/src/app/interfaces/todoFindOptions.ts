import { ReativeDriverOption } from '@reative/core';

export interface TodoFindOptions {
  useMemo?: boolean;
  useCache?: boolean;
  useNetwork?: boolean;
  driver?: ReativeDriverOption;
  pathname?: string;
}
