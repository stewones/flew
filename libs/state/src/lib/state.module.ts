import { Config } from '@firetask/reactive-record';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ReactiveResponseSync, ReactiveResponseReset } from './store';

@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Config.store.dispatch.subscribe(r => {
      store.dispatch(new ReactiveResponseSync(r));
    });
    Config.store.reset.subscribe(() =>
      store.dispatch(new ReactiveResponseReset())
    );
  }
}

@NgModule()
export class ReactiveStateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReactiveStateModule,
      providers: [Store, StateSetup]
    };
  }
  constructor(private state: StateSetup) {}
}
