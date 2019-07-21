import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Reative,
  FirebaseConnector,
  FirestoreConnector,
  Connector
} from '@reative/records';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

export interface ReativeFirebaseOptions {
  config: any;
  persistence: boolean;
}

@Injectable()
export class ReativeFirebaseSetup {
  constructor(@Inject('ReativeFirebaseOptions') public options) {
    Reative.connector = {
      firebase: new FirebaseConnector(Firebase, options.config),
      firestore: new FirestoreConnector(Firebase, options.config)
    } as Connector;
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
