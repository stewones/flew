import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterContainerModule } from './containers/counter-container/counter-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CounterContainerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
