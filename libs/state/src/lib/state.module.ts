import { Config } from '@firetask/reactive-record';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResponseSync, ResponseReset } from './store';

@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Config.store.dispatch.subscribe(r => {
      store.dispatch(new ResponseSync(r));
    });
    Config.store.reset.subscribe(() => store.dispatch(new ResponseReset()));
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
