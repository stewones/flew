import 'firebase/storage';
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
  RecordsModule,
  ParseModule,
  StateModule,
  CacheModule,
  ReativeState,
  FirebaseModule
} from '@reative/angular';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyBCXnFNk0PL7xiPYpm8r88dfNUpy5QHGKE',
  authDomain: 'ontime-manager.firebaseapp.com',
  databaseURL: 'https://ontime-manager.firebaseio.com',
  projectId: 'ontime-manager',
  storageBucket: 'ontime-manager.appspot.com',
  messagingSenderId: '290172576309'
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
    RecordsModule.forRoot({
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
      appID: environment.parse.appID
    }),

    //
    // use rr for firebase
    FirebaseModule.forRoot({
      config: firebaseConfig,
      persistence: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
