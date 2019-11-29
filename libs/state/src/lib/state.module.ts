import { Reative } from '@reative/records';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  StateSync,
  StateReset,
  key,
  addState,
  getState,
  setState
} from './store';
import { get } from 'lodash';
import { STATE_GLOBAL_NAMESPACE } from './config';
@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Reative.store.enabled = true;
    Reative.store.reset = () => store.dispatch(new StateReset());
    Reative.store.sync = r => {
      store.dispatch(new StateSync(r));
    };

    Reative.store.get = key => {
      const snapshot = this.store.snapshot();
      const state = get(snapshot, `${STATE_GLOBAL_NAMESPACE}.${key}`) || {};
      return state;
    };

    Reative.store.set = (key, val) => {
      const newState = { ...val, key: key };
      store.dispatch(new StateSync(newState));
    };

    Reative.store.select = (_key, _raw?) => {
      return this.store.select(key(_key, _raw));
    };

    Reative.store.addState = addState;
    Reative.store.getState = getState;
    Reative.store.setState = setState;
  }
}

@NgModule()
export class StateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [Store, StateSetup]
    };
  }
  constructor(private _: StateSetup) {}
}
