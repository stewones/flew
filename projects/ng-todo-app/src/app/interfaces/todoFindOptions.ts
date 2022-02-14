import { FlewDriverOption } from '@flew/core';

export interface TodoFindOptions {
  useState?: boolean;
  useCache?: boolean;
  useNetwork?: boolean;
  from?: FlewDriverOption;
  pathname?: string;
}
