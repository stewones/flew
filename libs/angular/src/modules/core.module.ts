import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { Reative, ReativeOptions } from '@reative/core';

@Injectable()
class ReativeAngularSetup {
  constructor(@Inject('ReativeAngularOptions') public options) {
    for (const k in options) {
      Reative.options[k] = options[k];
    }
  }
}

/**
  Records Module 
  @example
  ```js
  import { RecordsModule } from '@reative/angular';
  //... 
  RecordsModule.forRoot({
    driver: 'parse', // define default data driver
    silent: false, // whether show logs
    timestamp: false // auto save timestamp
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt'
  })
  //...
  ```
  @export
  @class RecordsModule
*/
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
