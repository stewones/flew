// import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  ReativeModule,
  ParseModule,
  StateModule,
  CacheModule,
  ReativeState,
  FirebaseModule
} from '@reative/angular';
import { environment } from '../environments/environment';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDd0NPKiqB06EkCxRRai6rHphUVgkU38jA',
  authDomain: 'reactive-record-demo.firebaseapp.com',
  databaseURL: 'https://reactive-record-demo.firebaseio.com',
  projectId: 'reactive-record-demo',
  storageBucket: 'reactive-record-demo.appspot.com',
  messagingSenderId: '244444899524'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),

    //
    // ngxs
    NgxsModule.forRoot([ReativeState], {
      developmentMode: !environment.production
    }),

    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),

    //
    // rr state
    StateModule.forRoot(),

    //
    // init rr for angular
    ReativeModule.forRoot({
      silent: true
    }),

    //
    // use rr cache
    CacheModule.forRoot({
      dbName: environment.dbName,
      dbStore: environment.dbStoreName
    }),

    //
    // use parse
    ParseModule.forRoot({
      serverURL: environment.parse.serverURL,
      appID: environment.parse.appID,
      masterKey: environment.parse.masterKey
    }),

    //
    // use rr for firebase
    FirebaseModule.forRoot({
      config: FIREBASE_CONFIG,
      persistence: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
