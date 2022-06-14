import * as reducers from './reducers';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { cachePlugin } from '@flew/cache';
import { parsePlugin } from '@flew/parse';
import { statePlugin } from '@flew/state';
import { setup } from '@flew/core';
import { environment } from '../environments/environment';

setup({
  options: {
    silent: false,
    driver: 'parse',
    timestampCreated: 'createdAt',
    timestampUpdated: 'updatedAt',
    identifier: 'objectId',
    httpConfig: {
      timeout: 60 * 1000 * 2,
    },
  },
  plugins: [
    parsePlugin({
      serverURL: 'http://localhost:1337/parse',
      appID: 'IntenseplusServer',
    }),
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
  ],
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
