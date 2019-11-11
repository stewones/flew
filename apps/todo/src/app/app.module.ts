import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientModule } from '@angular/common/http';
import { FIREBASE_CONFIG } from '../environments/firebase.config';

import { RecordsModule } from '@reative/angular';
import { FirebaseModule } from '@reative/firebase';
import { CacheModule } from '@reative/cache';
import { State, StateModule } from '@reative/state';
import { TodoListContainerModule } from './containers/todo-list-container/todo-list-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TodoListContainerModule,
    //
    // rr stuff
    //
    // init rr state
    StateModule.forRoot(),
    //
    // init rr
    RecordsModule.forRoot({
      silent: !isDev()
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
    NgxsModule.forRoot([State], {
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
