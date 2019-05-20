import { NgModule } from '@angular/core';
import { Store } from '@ngxs/store';
import { SyncReactiveResponse, ResetReactiveResponse } from './store';
import { Config } from '../../../reactive-record/src/lib/symbols/rr';

@NgModule()
export class ReactiveModule {
  constructor(public store: Store) {
    Config.store.dispatch.subscribe(payload =>
      store.dispatch(new SyncReactiveResponse(payload))
    );
    Config.store.reset.subscribe(___ =>
      store.dispatch(new ResetReactiveResponse())
    );
  }
}
