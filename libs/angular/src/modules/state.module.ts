import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Reative } from '@reative/core';
import {
  addState,
  getState,
  key,
  setState,
  StateModel,
  StateReset,
  StateSync,
  STATE_GLOBAL_NAMESPACE
} from '@reative/state';
import { get } from 'lodash';

@Injectable()
export class ReativeStateSetup {
  constructor(public store: Store) {
    Reative.store.enabled = true;
    Reative.store.reset = () => store.dispatch(new StateReset());
    Reative.store.sync = r => {
      store.dispatch(new StateSync(r));
    };

    Reative.store.get = stateKey => {
      const snapshot = this.store.snapshot();
      const state =
        get(snapshot, `${STATE_GLOBAL_NAMESPACE}.${stateKey}`) || {};
      return state;
    };

    Reative.store.set = (stateKey, val) => {
      const newState = { ...val, key: stateKey };
      store.dispatch(new StateSync(newState));
    };

    Reative.store.select = (stateKey, raw?) => {
      return this.store.select(key(stateKey, raw));
    };

    Reative.store.addState = addState;
    Reative.store.getState = getState;
    Reative.store.setState = setState;
  }
}

@State<StateModel>({
  name: STATE_GLOBAL_NAMESPACE,
  defaults: {}
})
export class ReativeState {
  @Action(StateSync) syncResponse(
    context: StateContext<StateModel>,
    action: StateSync
  ) {
    const stateKey: string = get(action, 'payload.key');
    if (!stateKey) return;
    const state = context.getState();
    const newState: any = {
      ...state,
      ...{
        [stateKey]: action.payload
      }
    };

    context.setState(newState);
  }

  @Action(StateReset) resetResponse(context: StateContext<StateModel>) {
    context.setState({});
  }

  constructor() {}
}

@NgModule()
export class StateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [ReativeState, ReativeStateSetup]
    };
  }
  constructor(private _: ReativeStateSetup) {}
}
