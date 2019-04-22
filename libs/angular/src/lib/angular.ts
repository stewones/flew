import { NgModule } from '@angular/core';
import { Store } from '@ngxs/store';
import { SyncReactiveResponse } from './store';
import { Config } from '../../../reactive-record/src/lib/symbols/rr';

@NgModule()
export class ReactiveModule {
  constructor(public store: Store) {
    Config.store.dispatch.subscribe(payload =>
      store.dispatch(new SyncReactiveResponse(payload))
    );
  }
}
