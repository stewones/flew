import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Config,
  FirebaseConnector,
  FirestoreConnector,
  Options
} from '@firetask/reactive-record';
import { storageConfig } from '@firetask/core';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ReactiveAngular {
  constructor(@Inject('Options') public options) {
    //
    // configure reactive record
    Config.options = {
      ...Config.options,
      ...options,
      ...{
        storage: new Storage(storageConfig(options.dbName, options.dbStore))
      },
      ...{
        connector: {
          firebase: new FirebaseConnector(Firebase, options.firebaseConfig),
          firestore: new FirestoreConnector(Firebase, options.firebaseConfig)
        }
      }
    };
  }
}

@NgModule()
export class ReactiveModule {
  public static forRoot(options: Options = {}): ModuleWithProviders {
    return {
      ngModule: ReactiveModule,
      providers: [
        ReactiveAngular,
        {
          provide: 'Options',
          useValue: options
        }
      ]
    };
  }
  constructor(private angular: ReactiveAngular) {}
}
