import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { StateModule } from '@reative/angular';
import { environment } from '../environments/environment';

import { counter } from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StateModule.forRoot({
      // enable devtools when production is false
      production: environment.production,
      // devtools option. see more at
      // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
      trace: true,
      // define an initial state
      state: {
        // counter: 420 // uncomment this line
      },
      // pass in the app reducers
      reducers: { counter }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
