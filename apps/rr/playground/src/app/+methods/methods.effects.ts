import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { MethodsPartialState } from './methods.reducer';
import {
  LoadMethods,
  MethodsLoaded,
  MethodsLoadError,
  MethodsActionTypes
} from './methods.actions';

@Injectable()
export class MethodsEffects {
  @Effect() loadMethods$ = this.dataPersistence.fetch(
    MethodsActionTypes.LoadMethods,
    {
      run: (action: LoadMethods, state: MethodsPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new MethodsLoaded([]);
      },

      onError: (action: LoadMethods, error) => {
        console.error('Error', error);
        return new MethodsLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<MethodsPartialState>
  ) {}
}
