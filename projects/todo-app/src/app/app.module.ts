import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { Injectable } from '@angular/core';
import { getCache, installCache } from '@flew/cache';

const states = ['oi'];

export async function feedStateFromCache() {
  for (const state of states) {
    const cache = await getCache(state);
    console.log(456, cache);
  }
}

@Injectable()
export class AppStart {
  async up() {
    await feedStateFromCache();
    return true;
  }
}

import { installNetwork } from '@flew/network';
import { installState } from '@flew/state';

installNetwork({
  silent: false,
});

installCache({
  name: 'flew',
  store: 'todo-app',
});

installState({
  production: false,
  trace: true,
  traceLimit: 25,
});
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    AppStart,
    {
      provide: APP_INITIALIZER,
      useFactory: (start: AppStart) => () => start.up(),
      deps: [AppStart],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
