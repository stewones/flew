import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MethodPartialState, Method } from './methods.reducer';
import {
  LoadMethods,
  MethodsLoaded,
  MethodsLoadError,
  MethodsActionTypes
} from './methods.actions';

import { mergeMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable()
export class MethodEffects {
  @Effect({
    dispatch: false
  })
  addMethod$ = this.actions$.pipe(
    ofType(MethodsActionTypes.ADD_METHOD),
    tap((action: any) => {
      alert(`oh yeah ${action.payload.name}`);
    })
  );

  constructor(private actions$: Actions) {}
}
