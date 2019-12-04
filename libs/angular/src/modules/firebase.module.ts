import * as Firebase from 'firebase/app';
import { install, ReativeFirebaseOptions } from '@reative/firebase';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class ReativeFirebaseSetup {
  constructor(@Inject('ReativeFirebaseOptions') public options) {
    install(Firebase, options.config);
  }
}

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
