//
// FULL EXPERIMENTAL

import { Injectable, InjectionToken } from '@angular/core';
import { Options } from '../interfaces/options';

export const ROOT_STATE_TOKEN = new InjectionToken<any>('ROOT_STATE_TOKEN');
export const FEATURE_STATE_TOKEN = new InjectionToken<any>(
  'FEATURE_STATE_TOKEN'
);

/**
 * The RR Module config settings.
 * Note: this is available only for browser platform (should use angular)
 */
@Injectable()
export class ReactiveRecordConfig implements Options {
  constructor() {
    console.log('ReactiveRecordConfig boot');
  }
}

@Injectable()
export class ReactiveDecoratorService {
  private static service: ReactiveRecordConfig | undefined = undefined;
  public constructor(service: ReactiveRecordConfig) {
    console.log('HLLOW WORLD');
    ReactiveDecoratorService.service = service;
  }
  public static getService(): ReactiveRecordConfig {
    if (!ReactiveDecoratorService.service) {
      throw new Error('ReactiveDecoratorService not initialized');
    }
    return ReactiveDecoratorService.service;
  }
}
