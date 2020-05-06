import {
  Injectable,
  Inject,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { createStore, applyDevTools, install } from '@reative/state';

export interface StoreOptions {
  production?: boolean;
  reducers?: any;
  state?: any; // the initial state
  trace?: boolean;
  // see more options at https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
}

@Injectable()
export class StateSetup {
  constructor(@Inject('StoreOptions') public options) {
    install();
    createStore(
      (options && options.reducers) || {},
      (options && options.state) || {},
      options && options.production === false ? applyDevTools(options) : null
    );
  }
}

/**
  State Module 
  @export
  @class StateModule
*/
@NgModule()
export class StateModule {
  public static forRoot(
    options: StoreOptions = {} as StoreOptions
  ): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        StateSetup,
        {
          provide: 'StoreOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private _: StateSetup) {}
}
