import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  provideStorage,
  Storage,
  StorageConfig,
  StorageConfigToken
} from './storage';

@NgModule()
export class IonicStorageModule {
  static forRoot(storageConfig: StorageConfig = null): ModuleWithProviders {
    return {
      ngModule: IonicStorageModule,
      providers: [
        { provide: StorageConfigToken, useValue: storageConfig },
        {
          provide: Storage,
          useFactory: provideStorage,
          deps: [StorageConfigToken]
        }
      ]
    };
  }
}
