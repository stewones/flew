import { install, storageConfig, CacheOptions } from '@rebased/cache';
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

/**
  Cache Module
  @example
  ```js
  import { CacheModule } from '@rebased/angular';
  //... 
  CacheModule.forRoot({
    dbName: 'kitty',
    dbStore: 'app'
  })
  //...
  ```
  @export
  @class CacheModule
*/
@NgModule()
export class CacheModule {
  public static forRoot(
    options: CacheOptions = {} as CacheOptions
  ): ModuleWithProviders<CacheModule> {
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
