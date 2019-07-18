import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Config,
  FirebaseConnector,
  FirestoreConnector
} from '@firetask/reactive-record';

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
    Reactive.options.connector = {
      firebase: new FirebaseConnector(Firebase, options.config),
      firestore: new FirestoreConnector(Firebase, options.config)
    };
  }
}

@NgModule()
export class ReactiveFirebaseModule {
  public static forRoot(
    options: ReactiveFirebaseOptions = {} as ReactiveFirebaseOptions
  ): ModuleWithProviders {
    return {
      ngModule: ReactiveFirebaseModule,
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
