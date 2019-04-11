import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import {
//   ReactiveRecordModule,
//   ReactiveRecordConfig
// } from '@firetask/reactive-record';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule /*ReactiveRecordModule.forRoot({ useLog: false })*/],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
