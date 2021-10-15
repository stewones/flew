import { RebasedDriverOption } from '@rebased/core';

export interface TodoFindOptions {
  useState?: boolean;
  useCache?: boolean;
  useNetwork?: boolean;
  from?: RebasedDriverOption;
  pathname?: string;
}
