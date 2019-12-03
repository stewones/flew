import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { Reative } from '@reative/core';
import { ParseOptions } from '@reative/parse';

import Parse from 'parse';

@Injectable()
export class ParseSetup {
  constructor(@Inject('ParseOptions') public options) {
    Parse.initialize(options.appID);
    Parse.serverURL = options.serverURL;
    Parse.masterKey = options.masterKey;
    Reative.Parse = Parse;
  }
}

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
