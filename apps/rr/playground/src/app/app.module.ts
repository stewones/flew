import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';

import {
  METHODS_FEATURE_KEY,
  initialState as methodsInitialState,
  methodsReducer
} from './+methods/methods.reducer';
import { MethodsEffects } from './+methods/methods.effects';

import { ChainingPickerContainerModule } from './+methods/containers/chaining-picker-container/chaining-picker-container.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NxModule.forRoot(),
    StoreModule.forFeature(METHODS_FEATURE_KEY, methodsReducer, {
      initialState: methodsInitialState
    }),
    EffectsModule.forFeature([MethodsEffects]),
    ChainingPickerContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
