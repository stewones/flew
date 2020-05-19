import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReativeModule, StateModule } from '@reative/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReativeModule.forRoot({
      silent: false
    }),
    StateModule.forRoot({ production: false, trace: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
