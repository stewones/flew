import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';

import { initialState, reducer } from './+methods/methods.reducer';
import { MethodEffects } from './+methods/methods.effects';

import { ChainingPickerContainerModule } from './+methods/containers/chaining-picker-container/chaining-picker-container.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      { methods: reducer },
      {
        initialState: { methods: initialState },
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([MethodEffects]),
    NxModule.forRoot(),
    ChainingPickerContainerModule

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
