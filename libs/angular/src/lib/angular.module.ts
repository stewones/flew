import {
  NgModule,
  InjectionToken,
  Injector,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RROptions } from '@firetask/reactive-record';
import { merge } from 'lodash';

export const $options: RROptions = {
  baseURL: 'https://rr.dev'
};

export class RRProvider {
  public static options: RROptions;

  constructor(options: RROptions) {
    merge(this, options);
    RRProvider.options = options;
  }
}

export class ReactiveRecordProvider {
  public static options: RROptions;

  constructor(options: RROptions) {
    merge(this, options);
  }
}

export const RROptionsToken = new InjectionToken<any>('RR_OPTIONS_TOKEN');

export function provideRR(options: RROptions): ReactiveRecordProvider {
  const config = !!options ? options : {};
  return new ReactiveRecordProvider(config);
}

@NgModule({
  imports: [CommonModule]
})
export class RRInjectorModule {
  static injector: Injector;

  constructor(injector: Injector) {
    RRInjectorModule.injector = injector;
  }
}

@NgModule({
  imports: [CommonModule]
})
export class ReactiveRecordModule {
  static forRoot(options: RROptions): ModuleWithProviders {
    return {
      ngModule: ReactiveRecordModule,
      providers: [
        { provide: RROptionsToken, useValue: $options },
        {
          provide: ReactiveRecordProvider,
          useFactory: provideRR,
          deps: [RROptionsToken]
        }
      ]
    };
  }
}
