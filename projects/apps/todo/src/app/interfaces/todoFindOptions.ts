import { RebasedDriverOption } from '@rebased/core';

export interface TodoFindOptions {
  useState?: boolean;
  useCache?: boolean;
  useNetwork?: boolean;
  driver?: RebasedDriverOption;
  pathname?: string;
}
