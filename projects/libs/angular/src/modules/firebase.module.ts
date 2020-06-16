import * as Firebase from 'firebase/app';
import { install, RebasedFirebaseOptions } from '@rebased/firebase';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class RebasedFirebaseSetup {
  constructor(@Inject('RebasedFirebaseOptions') public options) {
    install(Firebase, options.config);
  }
}

/**
  Firebase Module 
  @example
  ```js
  import { FirebaseModule } from '@rebased/angular';
  //... 
  FirebaseModule.forRoot({
    config: FIREBASE_CONFIG, // from firebase console
    persistence: true // firestore setting
  })
  //...
  ```
  @export
  @class FirebaseModule
*/
@NgModule()
export class FirebaseModule {
  public static forRoot(
    options: RebasedFirebaseOptions = {} as RebasedFirebaseOptions
  ): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
      providers: [
        RebasedFirebaseSetup,
        {
          provide: 'RebasedFirebaseOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private fire: RebasedFirebaseSetup) {}
}
