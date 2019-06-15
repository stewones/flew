import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import * as Firebase from 'firebase/app';
import {
  Config,
  FirebaseConnector,
  FirestoreConnector,
  Options,
  storageConfig
} from '@firetask/reactive-record';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';
import { Store } from '@ngxs/store';
import { SyncReactiveResponse, ResetReactiveResponse } from './store';

import { Storage } from '@ionic/storage';

@Injectable()
export class ReactiveBrowser {
  constructor(@Inject('Options') public options, public store: Store) {
    //
    // configure reactive record
    Config.options = {
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

    //
    // configure store
    Config.store.dispatch.subscribe(r =>
      store.dispatch(new SyncReactiveResponse(r))
    );
    Config.store.reset.subscribe(() =>
      store.dispatch(new ResetReactiveResponse())
    );
  }
}

@NgModule()
export class ReactiveModule {
  public static forRoot(options: Options = {}): ModuleWithProviders {
    return {
      ngModule: ReactiveModule,
      providers: [
        Store,
        ReactiveBrowser,
        {
          provide: 'Options',
          useValue: options
        }
      ]
    };
  }
  constructor(public browser: ReactiveBrowser) {}
}
