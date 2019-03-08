import {
  NgModule,
  InjectionToken,
  Injector,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from '@firetask/reactive-record';
import { merge } from 'lodash';

export const $options: Options = {
  baseURL: 'https://rr.dev'
};

export class RRProvider {
  public static options: Options;

  constructor(options: Options) {
    merge(this, options);
    RRProvider.options = options;
  }
}

export class ReactiveRecordProvider {
  public static options: Options;

  constructor(options: Options) {
    merge(this, options);
  }
}

export const OptionsToken = new InjectionToken<any>('RR_OPTIONS_TOKEN');

export function provideRR(options: Options): ReactiveRecordProvider {
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
  static forRoot(options: Options): ModuleWithProviders {
    return {
      ngModule: ReactiveRecordModule,
      providers: [
        { provide: OptionsToken, useValue: $options },
        {
          provide: ReactiveRecordProvider,
          useFactory: provideRR,
          deps: [OptionsToken]
        }
      ]
    };
  }
}
