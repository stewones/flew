import * as reducers from './reducers';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { cachePlugin } from '@flew/cache';
import { statePlugin } from '@flew/state';
import { firebasePlugin } from '@flew/firebase';

import { setup } from '@flew/core';
import { AppRoutesModule } from './app.routes';
import { environment } from '../environments/environment';

import { FIREBASE_CONFIG } from './configs/firebase';

setup({
  options: {
    silent: false,
    baseURL: 'https://api.thecatapi.com',
    endpoint: '/v1',
  },
  plugins: [
    cachePlugin({
      name: 'flew',
      store: 'todo-app',
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
  imports: [BrowserModule, AppRoutesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
