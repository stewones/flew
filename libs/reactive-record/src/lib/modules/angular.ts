//
// FULL EXPERIMENTAL

import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import {
  ReactiveRecordConfig,
  ReactiveDecoratorService
} from '../symbols/angular';

@NgModule()
export class ReactiveRecordRootModule {
  constructor() {}
}

@NgModule({})
export class ReactiveRecordFeatureModule {
  constructor() {}
}

export type ModuleOptions = Partial<ReactiveRecordConfig>;

export function configFactory(options: ModuleOptions): ReactiveRecordConfig {
  const config = Object.assign(new ReactiveRecordConfig(), options);
  console.log('configFactory', config);
  return config;
}

export const ROOT_OPTIONS = new InjectionToken<ModuleOptions>('ROOT_OPTIONS');

/**
 * The RR Module.
 * Note: this is available only for browser platform (should use angular)
 */
@NgModule({})
export class ReactiveRecordModule {
  private static readonly ROOT_OPTIONS = new InjectionToken<ModuleOptions>(
    'ROOT_OPTIONS'
  );

  static forRoot(options: ModuleOptions = {}): ModuleWithProviders {
    console.log('forRoot', options);
    return {
      ngModule: ReactiveRecordRootModule,
      providers: [
        ReactiveDecoratorService,
        {
          provide: ReactiveRecordConfig,
          useFactory: ReactiveRecordModule.configFactory,
          deps: [ReactiveRecordModule.ROOT_OPTIONS]
        },
        {
          provide: ReactiveRecordModule.ROOT_OPTIONS,
          useValue: options
        }
      ]
    };
  }

  private static configFactory(options: ModuleOptions): ReactiveRecordConfig {
    console.log('OIE FDP !!!!', options);
    return Object.assign(new ReactiveRecordConfig(), options);
  }

  /**
   * Feature module factory
   */
  //   static forFeature(states: StateClass[] = []): ModuleWithProviders {
  //     return {
  //       ngModule: NgxsFeatureModule,
  //       providers: [
  //         StateFactory,
  //         PluginManager,
  //         ...states,
  //         {
  //           provide: FEATURE_STATE_TOKEN,
  //           multi: true,
  //           useValue: states
  //         }
  //       ]
  //     };
  //   }
}
