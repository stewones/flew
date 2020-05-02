import {
  Injectable,
  ModuleWithProviders,
  NgModule,
  Inject
} from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';

import {
  install,
  addStateResponse,
  resetStateResponse,
  removeStateResponse,
  StateModel,
  StateReset,
  StateRemove,
  StateSync,
  STATE_GLOBAL_NAMESPACE,
  store,
  createStore,
  applyDevTools
} from '@reative/state';

export interface StoreOptions {
  production?: boolean;
  reducers?: any;
  initialState?: any;
}

@Injectable()
export class ReativeStateSetup {
  constructor(
    public ngxs_store: Store,
    @Inject('StoreOptions') public options
  ) {
    install(ngxs_store);

    //
    // redux
    createStore(
      (options && options.reducers) || {},
      (options && options.initialState) || {},
      applyDevTools(options && options.production === false)
    );
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
@Injectable()
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

  @Action(StateRemove) removeResponse(
    context: StateContext<StateModel>,
    action: StateSync
  ) {
    removeStateResponse(context, action);
  }

  constructor() {}
}

/**
  Store Module 
  @example
  ```js
  import { StoreModule } from '@reative/angular';
  //... 
  StoreModule.forRoot()
  //...
  ```
  @export
  @class StoreModule
*/
@NgModule()
export class StoreModule {
  public static forRoot(
    options: StoreOptions = {} as StoreOptions
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        ReativeState,
        ReativeStateSetup,
        {
          provide: 'StoreOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private _: ReativeStateSetup) {}
}

/**
  State Module 
  @export
  @class StateModule
  @deprecated
  StateModule has been deprecated in favor of StoreModule from redux.
  Please replace as soon as you can as we're going to remove on next major.
*/

@NgModule()
export class StateModule {
  public static forRoot(
    options: StoreOptions = {} as StoreOptions
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        ReativeState,
        ReativeStateSetup,
        {
          provide: 'StoreOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private _: ReativeStateSetup) {}
}
