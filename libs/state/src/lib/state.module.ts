import { Reactive } from '@firetask/reactive-record';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResponseSync, ResponseReset, key } from './store';
import { get } from 'lodash';

@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Reactive.store.enabled = true;
    Reactive.store.reset = () => store.dispatch(new ResponseReset());
    Reactive.store.sync = r => {
      store.dispatch(new ResponseSync(r));
    };
    Reactive.store.get = key => {
      const snapshot = this.store.snapshot();
      const state = get(snapshot, 'ReactiveState.responses') || [];
      return state.find(s => s.key === key);
    };
    Reactive.store.set = (key, val) => {
      const snapshot = this.store.snapshot();
      const responses = get(snapshot, 'ReactiveState.responses') || [];
      const state = responses.find(s => s.key === key);
      const newState = { key: key, ...val };
      store.dispatch(new ResponseSync(newState));
      return state;
    };
    Reactive.store.select = collectionKey => {
      return this.store.select(key(collectionKey));
    };
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
