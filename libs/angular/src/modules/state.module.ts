import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  install,
  addStateResponse,
  resetStateResponse,
  StateModel,
  StateReset,
  StateSync,
  STATE_GLOBAL_NAMESPACE
} from '@reative/state';

@Injectable()
class ReativeStateSetup {
  constructor(public store: Store) {
    install(store);
  }
}

/**
  Reative State
  @example
  ```js
  import { ReativeState } from '@reative/angular';
  import { NgxsModule } from '@ngxs/store';
  import { environment } from '../environments/environment';

  //... 
    NgxsModule.forRoot([ReativeState], {
        developmentMode: !environment.production
    }),
  //...
  ```
  @export
  @class ReativeState
*/
@State<StateModel>({
  name: STATE_GLOBAL_NAMESPACE,
  defaults: {}
})
export class ReativeState {
  @Action(StateSync) addResponse(
    context: StateContext<StateModel>,
    action: StateSync
  ) {
    addStateResponse(context, action);
  }

  @Action(StateReset) resetResponse(context: StateContext<StateModel>) {
    resetStateResponse(context);
  }

  constructor() {}
}

/**
  State Module 
  @example
  ```js
  import { StateModule } from '@reative/angular';
  //... 
  StateModule.forRoot()
  //...
  ```
  @export
  @class StateModule
*/
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
