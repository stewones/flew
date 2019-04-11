import 'firebase/firestore';
import * as Firebase from 'firebase/app';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  Config,
  FirebaseConnector,
  FirestoreConnector,
  Version
} from '@firetask/reactive-record';
import {
  environment,
  firebaseConfig,
  appVersion
} from '../environments/environment';

import { Storage } from '@ionic/storage';
import { storageConfig } from '@firetask/ionic'; // @todo export from reactive-record lib

Config.options = {
  useLog: !environment.production,
  useLogTrace: !environment.production,
  baseURL: 'https://api.thecatapi.com',
  endpoint: '',
  connector: {
    firebase: new FirebaseConnector(Firebase, firebaseConfig),
    firestore: new FirestoreConnector(Firebase, firebaseConfig)
  },

  // extra options
  version: Version.get(appVersion),
  storage: new Storage(storageConfig())
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule /*ReactiveRecordModule.forRoot({ useLog: false })*/],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
