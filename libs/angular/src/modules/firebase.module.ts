import * as Firebase from 'firebase/app';
import { install, ReativeFirebaseOptions } from '@reative/firebase';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
class ReativeFirebaseSetup {
  constructor(@Inject('ReativeFirebaseOptions') public options) {
    install(Firebase, options.config);
  }
}

/**
  Firebase Module 
  @example
  ```js
  import { FirebaseModule } from '@reative/angular';
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
    options: ReativeFirebaseOptions = {} as ReativeFirebaseOptions
  ): ModuleWithProviders {
    return {
      ngModule: FirebaseModule,
      providers: [
        ReativeFirebaseSetup,
        {
          provide: 'ReativeFirebaseOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private fire: ReativeFirebaseSetup) {}
}
