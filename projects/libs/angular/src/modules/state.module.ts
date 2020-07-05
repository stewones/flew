import {
  Injectable,
  Inject,
  NgModule,
  ModuleWithProviders
} from '@angular/core';

export interface StoreOptions {
  production?: boolean;
  reducers?: any;
  state?: any; // the initial state
  trace?: boolean; // see more options at https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
  loader: any;
}

@Injectable()
export class StateSetup {
  constructor(@Inject('StoreOptions') public options) {
    options.loader.install();

    options.loader.createStore(
      (options && options.reducers) || {},
      (options && options.state) || {},
      options.loader.applyDevTools(options)
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
