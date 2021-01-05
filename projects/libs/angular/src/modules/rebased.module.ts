import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { Rebased, RebasedOptions, install } from '@rebased/core';

@Injectable()
export class RebasedAngularSetup {
  constructor(@Inject('RebasedAngularOptions') public options) {
    install(options);
    for (const k in options) {
      Rebased.options[k] = options[k];
    }
  }
}

/**
  Rebased Module 
  @example
  ```js
  import { RebasedModule } from '@rebased/angular';
  //... 
  RebasedModule.forRoot({
    from: 'parse', // define default data driver
    silent: false, // whether show logs
    timestamp: false // auto save timestamp
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt'
  })
  //...
  ```
  @export
  @class RebasedModule
*/
@NgModule()
export class RebasedModule {
  public static forRoot(
    options: RebasedOptions = {}
  ): ModuleWithProviders<RebasedModule> {
    return {
      ngModule: RebasedModule,
      providers: [
        RebasedAngularSetup,
        {
          provide: 'RebasedAngularOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private angular: RebasedAngularSetup) {}
}
