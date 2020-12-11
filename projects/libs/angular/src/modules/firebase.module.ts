export interface FirebaseOptions {
  config: any;
  persistence?: boolean;
}

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import { firebaseLoader } from '@rebased/firebase';

@Injectable()
export class RebasedFirebaseSetup {
  constructor(@Inject('FirebaseOptions') public options) {
    firebaseLoader.install({ config: options.config });
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
    options: FirebaseOptions = {} as FirebaseOptions
  ): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
      providers: [
        RebasedFirebaseSetup,
        {
          provide: 'FirebaseOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private fire: RebasedFirebaseSetup) {}
}
