import { Reative, ReativeOptions } from '@reative/core';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class ReativeAngularSetup {
  constructor(@Inject('ReativeAngularOptions') public options) {
    for (const k in options) {
      Reative.options[k] = options[k];
    }
  }
}
@NgModule()
export class RecordsModule {
  public static forRoot(options: ReativeOptions = {}): ModuleWithProviders {
    return {
      ngModule: RecordsModule,
      providers: [
        ReativeAngularSetup,
        {
          provide: 'ReativeAngularOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private angular: ReativeAngularSetup) {}
}
