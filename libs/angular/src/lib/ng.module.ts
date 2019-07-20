import { Reactive, Options } from '@reactive/records';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';
@Injectable()
export class ReactiveAngularSetup {
  constructor(@Inject('ReactiveAngularOptions') public options) {
    for (const k in options) {
      Reactive.options[k] = options[k];
    }
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
