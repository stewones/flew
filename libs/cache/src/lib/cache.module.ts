import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Reactive } from '@reactive/records';
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
    Reactive.storage = new Storage(
      storageConfig(options.dbName, options.dbStore)
    );
  }
}

@NgModule({
  declarations: [],
  imports: [IonicModule.forRoot()],
  exports: [IonicModule]
})
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
        },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ]
    };
  }
  constructor(private cache: CacheSetup) {}
}
