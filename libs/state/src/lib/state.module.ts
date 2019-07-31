import { Reative } from '@reative/records';
import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResponseSync, ResponseReset, key } from './store';
import { get, isObject } from 'lodash';

@Injectable()
export class StateSetup {
  constructor(public store: Store) {
    Reative.store.enabled = true;
    Reative.store.reset = () => store.dispatch(new ResponseReset());
    Reative.store.sync = r => {
      store.dispatch(new ResponseSync(r));
    };
    Reative.store.get = key => {
      const snapshot = this.store.snapshot();
      const state = get(snapshot, 'Reative.Records') || [];
      return state.find(s => isObject(s) && s.key === key);
    };
    Reative.store.set = (key, val) => {
      const newState = { ...val, key: key };
      store.dispatch(new ResponseSync(newState));
    };
    Reative.store.select = (_key, _raw?) => {
      return this.store.select(key(_key, _raw));
    };
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
