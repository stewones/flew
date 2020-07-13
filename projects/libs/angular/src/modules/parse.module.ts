import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';

export interface ParseOptions {
  serverURL: string;
  appID: string;
  loader: any;
}

@Injectable()
export class ParseSetup {
  constructor(@Inject('ParseOptions') public options: ParseOptions) {
    options.loader.install(options.loader.Parse, options);
  }
}

/**
  Parse Module 
  @example
  ```js
  import { ParseModule } from '@rebased/angular';
  //... 
  ParseModule.forRoot({
    serverURL: 'http://parse-endpoint.com',
    appID: 'Parse-APP-ID',
    masterKey: 'Parse-master-key'
  })
  //...
  ```
  @export
  @class ParseModule
*/
@NgModule()
export class ParseModule {
  public static forRoot(
    options: ParseOptions = {} as ParseOptions
  ): ModuleWithProviders<ParseModule> {
    return {
      ngModule: ParseModule,
      providers: [
        ParseSetup,
        {
          provide: 'ParseOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private parse: ParseSetup) {}
}
