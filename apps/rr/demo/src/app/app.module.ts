import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { DemoState } from './app.state';
import { ReactiveModule, ReactiveState } from '@firetask/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveModule,
    NgxsModule.forRoot([ReactiveState, DemoState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
