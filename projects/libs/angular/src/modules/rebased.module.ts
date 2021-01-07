import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { RebasedOptions, install } from '@rebased/core';

@Injectable()
export class RebasedAngularSetup {
  constructor(@Inject('RebasedAngularOptions') public options) {
    install(options);
  }
}

/**
  Rebased Module 
  @example
  ```js
  import { RebasedModule } from '@rebased/angular';
  //... 
  RebasedModule.forRoot({
    driver: 'firestore', // define default data driver
    silent: false, // whether show logs
    timestampEnabled: true // auto save timestamp
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
