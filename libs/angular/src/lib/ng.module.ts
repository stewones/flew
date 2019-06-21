import { Config, Options } from '@firetask/reactive-record';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';
@Injectable()
export class ReactiveAngularSetup {
  constructor(@Inject('ReactiveAngularOptions') public options) {
    //
    // configure reactive record
    Config.options = {
      ...Config.options,
      ...options
    };
  }
}
@NgModule()
export class ReactiveModule {
  public static forRoot(options: Options = {}): ModuleWithProviders {
    return {
      ngModule: ReactiveModule,
      providers: [
        ReactiveAngularSetup,
        {
          provide: 'ReactiveAngularOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private angular: ReactiveAngularSetup) {}
}
