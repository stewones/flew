import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

export interface CacheOptions {
  dbName?: string;
  dbStore?: string;
  driverOrder?: string[];
  loader: any;
}

@Injectable()
export class CacheSetup {
  constructor(@Inject('CacheOptions') public options: CacheOptions) {
    options.loader.install(
      new options.loader.Storage(
        options.loader.storageConfig(
          options.dbName,
          options.dbStore,
          options.driverOrder
        )
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
