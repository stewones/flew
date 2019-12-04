import { install, storageConfig, CacheOptions } from '@reative/cache';
import { Storage } from '@ionic/storage';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class CacheSetup {
  constructor(@Inject('CacheOptions') public options) {
    install(new Storage(storageConfig(options.dbName, options.dbStore)));
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
