import { Config } from '@firetask/reactive-record';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResponseSync, ResponseReset } from './store';
import { get } from 'lodash';

@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Config.store.dispatch.subscribe(r => {
      store.dispatch(new ResponseSync(r));
    });
    Config.store.reset.subscribe(() => store.dispatch(new ResponseReset()));
    Config.store.search = key => {
      const snapshot = this.store.snapshot();
      const state = get(snapshot, 'ReactiveState.responses') || [];
      return state.find(s => s.key === key);
    };
    Config.store.change = (key, val) => {
      const snapshot = this.store.snapshot();
      const store = get(snapshot, 'ReactiveState.responses') || [];
      const state = store.find(s => s.key === key);
      const newState = { key: key, ...val };
      Config.store.dispatch.next(newState);
      return state;
    };
    Config.store.enabled = true;
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
