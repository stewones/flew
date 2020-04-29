import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroundModule } from './components/ground/ground.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PlayState } from './+state/play.state';
import { HttpClientModule } from '@angular/common/http';
import { FIREBASE_CONFIG } from '../environments/firebase.config';

import { ReativeModule } from '@reative/angular';
import { FirebaseModule } from '@reative/firebase';
import { CacheModule } from '@reative/cache';
import { State, StateModule } from '@reative/state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GroundModule,
    HttpClientModule,

    //
    // rr stuff
    //
    // init rr state
    StateModule.forRoot(),
    //
    // init rr
    ReativeModule.forRoot({
      silent: !isDev(),
      baseURL: 'https://jsonplaceholder.typicode.com'
    }),
    //
    // use rr with firebase
    FirebaseModule.forRoot({
      config: FIREBASE_CONFIG,
      persistence: true
    }),
    //
    // use rr with ionic (for cache)
    CacheModule.forRoot({
      dbName: environment.dbName,
      dbStore: environment.dbStoreName
    }),
    // store stuff
    NgxsModule.forRoot([State, PlayState], {
      developmentMode: isDev()
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: isProd() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

//
// some helpers
export function isDev() {
  return !environment.production;
}

export function isProd() {
  return environment.production;
}
