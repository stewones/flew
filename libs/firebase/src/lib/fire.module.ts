import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Reative,
  FirebaseConnector,
  FirestoreConnector
} from '@reative/records';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';
import { cloneDeep } from 'lodash';

export interface ReativeFirebaseOptions {
  config: any;
  persistence: boolean;
}

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
