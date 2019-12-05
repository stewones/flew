import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import { install, ParseOptions } from '@reative/parse';

import Parse from 'parse';

@Injectable()
class ParseSetup {
  constructor(@Inject('ParseOptions') public options) {
    install(Parse, options);
  }
}

/**
  Parse Module 
  @example
  ```js
  import { ParseModule } from '@reative/angular';
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
  ): ModuleWithProviders {
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
