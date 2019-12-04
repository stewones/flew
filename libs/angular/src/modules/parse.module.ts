import {
  Inject,
  Injectable,
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import { install, ParseOptions } from '@reative/parse';

import Parse from 'parse';

@Injectable()
export class ParseSetup {
  constructor(@Inject('ParseOptions') public options) {
    install(Parse, options);
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
