import {
  Injectable,
  Inject,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { createStore, applyDevTools } from '@reative/state';

export interface StoreOptions {
  production?: boolean;
  reducers?: any;
  initialState?: any;
}

@Injectable()
export class StateSetup {
  constructor(@Inject('StoreOptions') public options) {
    //
    // redux
    createStore(
      (options && options.reducers) || {},
      (options && options.initialState) || {},
      options && options.production === false ? applyDevTools() : null
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
