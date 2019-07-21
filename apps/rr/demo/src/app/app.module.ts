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
import { FirebaseModule } from '@reactive/firebase';
import { CacheModule } from '@reactive/cache';
import { RecordsModule } from '@reactive/angular';
import { State, StateModule } from '@reactive/state';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([State, DemoState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    //
    // rr stuff
    //
    // init rr state
    StateModule.forRoot(),
    //
    // init rr
    RecordsModule.forRoot({
      useLog: !environment.production
    }),
    //
    // use rr with firebase
    FirebaseModule.forRoot({
      config: firebaseConfig,
      persistence: true
    }),
    //
    // use rr with ionic (for cache)
    CacheModule.forRoot({
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
