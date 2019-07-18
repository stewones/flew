import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { storageConfig } from '@firetask/core';
import { Reactive } from '@firetask/reactive-record';

import { Ui } from './ui.service';

import {
  NgModule,
  ModuleWithProviders,
  Injectable,
  Inject
} from '@angular/core';

import { Storage } from '@ionic/storage';

export interface ReactiveIonicOptions {
  dbName: string;
  dbStore: string;
}

@Injectable()
export class ReactiveIonicSetup {
  constructor(@Inject('ReactiveIonicOptions') public options) {
    Reactive.options.storage = new Storage(
      storageConfig(options.dbName, options.dbStore)
    );
  }
}

@NgModule({
  declarations: [],
  imports: [IonicModule.forRoot()],
  exports: [IonicModule]
})
export class ReactiveIonicModule {
  public static forRoot(
    options: ReactiveIonicOptions = {} as ReactiveIonicOptions
  ): ModuleWithProviders {
    return {
      ngModule: ReactiveIonicModule,
      providers: [
        Ui,
        ReactiveIonicSetup,
        {
          provide: 'ReactiveIonicOptions',
          useValue: options
        },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ]
    };
  }
  constructor(private ionic: ReactiveIonicSetup) {}
}
