import { Reative } from '@reative/records';
import { storageConfig } from './utils';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import { Storage } from '@ionic/storage';

export interface CacheOptions {
  dbName: string;
  dbStore: string;
}

@Injectable()
export class CacheSetup {
  constructor(@Inject('CacheOptions') public options) {
    Reative.storage = new Storage(
      storageConfig(options.dbName, options.dbStore)
    );
  }
}

@NgModule()
export class CacheModule {
  public static forRoot(
    options: CacheOptions = {} as CacheOptions
  ): ModuleWithProviders {
    return {
      ngModule: CacheModule,
      providers: [
        CacheSetup,
        {
          provide: 'CacheOptions',
          useValue: options
        }
      ]
    };
  }
  constructor(private cache: CacheSetup) {}
}
