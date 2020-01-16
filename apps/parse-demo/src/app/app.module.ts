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
  ReativeState
} from '@reative/angular';
import { environment } from '../environments/environment';

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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
