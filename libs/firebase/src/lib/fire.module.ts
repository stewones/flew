import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Reactive,
  FirebaseConnector,
  FirestoreConnector,
  Connector
} from '@reactive/records';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

export interface ReactiveFirebaseOptions {
  config: any;
  persistence: boolean;
}

@Injectable()
export class ReactiveFirebaseSetup {
  constructor(@Inject('ReactiveFirebaseOptions') public options) {
    Reactive.connector = {
      firebase: new FirebaseConnector(Firebase, options.config),
      firestore: new FirestoreConnector(Firebase, options.config)
    } as Connector;
  }
}

@NgModule()
export class FirebaseModule {
  public static forRoot(
    options: ReactiveFirebaseOptions = {} as ReactiveFirebaseOptions
  ): ModuleWithProviders {
    return {
      ngModule: FirebaseModule,
      providers: [
        ReactiveFirebaseSetup,
        {
          provide: 'ReactiveFirebaseOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private fire: ReactiveFirebaseSetup) {}
}
