import 'firebase/firestore';
import 'firebase/auth';

import * as reducers from './reducers';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StateModule, CacheModule, FirebaseModule } from '@reative/angular';
import { environment } from '../environments/environment';
import { FIREBASE_CONFIG } from './configs/firebase';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutesModule,
    StateModule.forRoot({
      // enable devtools when production is false
      production: environment.production,
      // devtools option. see more at
      // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
      trace: true,
      // define an initial state
      state: {},
      // pass in the app reducers
      reducers: reducers
    }),
    // use firebase
    FirebaseModule.forRoot({
      config: FIREBASE_CONFIG,
      persistence: false
    })
    // use cache @todo
    // CacheModule.forRoot({
    //   dbName: environment.dbName,
    //   dbStore: environment.dbStore
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
