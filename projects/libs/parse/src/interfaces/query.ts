import { RebasedChainPayload } from '@rebased/core';

export interface QueryHandler {
  Parse: any;
  from: string;
  skipOnQuery: string[];
  skipOnOperator: string[];
  specialOperators: string[];
  chain: RebasedChainPayload;
  success: any;
  error: any;
}
