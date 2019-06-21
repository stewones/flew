import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { DemoState } from './app.state';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firebaseConfig } from '../environments/firebase.config';
import { ReactiveFirebaseModule } from '@firetask/firebase';
import { ReactiveIonicModule } from '@firetask/ionic';
import { ReactiveModule } from '@firetask/angular';
import { ReactiveState, ReactiveStateModule } from '@firetask/state';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ReactiveState, DemoState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    //
    // rr stuff
    //
    // init rr state
    ReactiveStateModule.forRoot(),
    //
    // init rr
    ReactiveModule.forRoot({
      useLog: !environment.production
    }),
    //
    // use rr with firebase
    ReactiveFirebaseModule.forRoot({
      config: firebaseConfig,
      persistence: true
    }),
    //
    // use rr with ionic (for cache)
    ReactiveIonicModule.forRoot({
      dbName: 'rr',
      dbStore: 'demo'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
