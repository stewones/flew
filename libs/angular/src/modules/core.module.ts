import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { Reative, ReativeOptions } from '@reative/core';

@Injectable()
export class ReativeAngularSetup {
  constructor(@Inject('ReativeAngularOptions') public options) {
    for (const k in options) {
      Reative.options[k] = options[k];
    }
  }
}

/**
  Reative Module 
  @example
  ```js
  import { ReativeModule } from '@reative/angular';
  //... 
  ReativeModule.forRoot({
    driver: 'parse', // define default data driver
    silent: false, // whether show logs
    timestamp: false // auto save timestamp
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt'
  })
  //...
  ```
  @export
  @class ReativeModule
*/
@NgModule()
export class ReativeModule {
  public static forRoot(
    options: ReativeOptions = {}
  ): ModuleWithProviders<ReativeModule> {
    return {
      ngModule: ReativeModule,
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
