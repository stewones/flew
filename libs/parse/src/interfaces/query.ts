import { ReativeChainPayload } from '@reative/core';

export interface QueryHandler {
  Parse: any;
  collection: string;
  skipOnQuery: string[];
  skipOnOperator: string[];
  specialOperators: string[];
  chain: ReativeChainPayload;
  success: any;
  error: any;
}
