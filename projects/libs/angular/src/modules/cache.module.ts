import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import { cacheLoader } from '@rebased/cache';

export interface CacheOptions {
  dbName?: string;
  dbStore?: string;
  driverOrder?: string[];
}

@Injectable()
export class CacheSetup {
  constructor(@Inject('CacheOptions') public options: CacheOptions) {
    cacheLoader.install(
      new cacheLoader.Storage(
        cacheLoader.storageConfig(
          options.dbName,
          options.dbStore,
          options.driverOrder
        ),
        null
      )
    );
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
