import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import {
  initialState as playInitialState,
  playReducer
} from './+play/play.reducer';
import { PlayEffects } from './+play/play.effects';
import { ChainingPickerContainerModule } from './containers/chaining-picker-container/chaining-picker-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    ChainingPickerContainerModule,
    StoreModule.forRoot(
      { play: playReducer },
      {
        initialState: { play: playInitialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([PlayEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []

    // StoreModule.forRoot(
    //   { methods: methodsReducer },
    //   {
    //     initialState: { methods: methodsInitialState },
    //     metaReducers: !environment.production ? [storeFreeze] : []
    //   }
    // ),
    // !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
