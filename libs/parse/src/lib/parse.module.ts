import { Reative } from '@reative/records';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import Parse from 'parse';

export interface ParseOptions {
  serverURL: string;
  appID: string;
}

@Injectable()
export class ParseSetup {
  constructor(@Inject('ParseOptions') public options) {
    Parse.initialize(options.appID);
    Parse.serverURL = options.serverURL;

    Reative.parse = {
      model: collection,
      query: query
    };
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

export function collection(name: string) {
  const Entity = Parse.Object.extend(name);
  return new Entity();
}

export function query(name: string) {
  return new Parse.Query(name);
}
