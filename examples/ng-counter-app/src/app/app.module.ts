import * as reducers from './reducers';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { cachePlugin } from '@flew/cache';
import { firebasePlugin } from '@flew/firebase';

import { statePlugin } from '@flew/state';
import { setup } from '@flew/core';
import { environment } from '../environments/environment';

import { FIREBASE_CONFIG } from './configs/firebase';

setup({
  options: {
    silent: false,
    driver: 'firestore',
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt',
    identifier: 'objectId',
    httpConfig: {
      timeout: 60 * 1000 * 2,
    },
  },
  plugins: [
    cachePlugin({
      name: 'flew',
      store: 'random-app',
    }),
    statePlugin({
      production: environment.production,
      trace: true,
      traceLimit: 25,
      state: {}, // initial state
      reducers: reducers,
    }),
    firebasePlugin({
      config: FIREBASE_CONFIG,
    }),
  ],
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
