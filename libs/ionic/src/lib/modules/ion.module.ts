import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ui } from '../services/ui.service';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [IonicModule.forRoot()],
  exports: [IonicModule]
})
export class IonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonModule,
      providers: [
        Ui,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ]
    };
  }
}
