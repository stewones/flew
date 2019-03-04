import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { storageConfig } from '@firetask/ionic';

// import { ReactiveRecordModule } from '@firetask/reactive-record-angular';
// import { Rr } from '@firetask/reactive-record';

//
// wip global decorator
// @Rr({
//   baseURL: 'https://www.google.com'
// })
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    IonicStorageModule.forRoot(storageConfig())
    //
    // wip angular module
    // ReactiveRecordModule.forRoot({
    //   baseURL: 'https://www.google.com'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
