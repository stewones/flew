import { FlewChainPayload } from '@flew/core';

export interface QueryHandler {
  Parse: any;
  collection: string;
  skipOnQuery: string[];
  skipOnOperator: string[];
  specialOperators: string[];
  chain: FlewChainPayload;
  success: any;
  error: any;
  method: string;
}
