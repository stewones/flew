import * as Firebase from 'firebase/app';
import { Reative, FirebaseConnector, FirestoreConnector } from '@reative/core';
import { ReativeFirebaseOptions } from '@reative/firebase';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';
import { cloneDeep } from 'lodash';

@Injectable()
export class ReativeFirebaseSetup {
  constructor(@Inject('ReativeFirebaseOptions') public options) {
    const connector = cloneDeep(Reative.connector);
    connector.firebase = new FirebaseConnector(Firebase, options.config);
    connector.firestore = new FirestoreConnector(Firebase, options.config);
    Reative.connector = connector;
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
