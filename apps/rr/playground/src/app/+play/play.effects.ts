import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { PlayPartialState } from './play.reducer';
import {
  LoadPlay,
  PlayLoaded,
  PlayLoadError,
  PlayActionTypes
} from './play.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class PlayEffects {
  // @Effect() loadPlay$ = this.dataPersistence.fetch(PlayActionTypes.LoadPlay, {
  //   run: (action: LoadPlay, state: PlayPartialState) => {
  //     // Your custom REST 'load' logic goes here. For now just return an empty list...
  //     return new PlayLoaded([]);
  //   },

  //   onError: (action: LoadPlay, error) => {
  //     console.error('Error', error);
  //     return new PlayLoadError(error);
  //   }
  // });

  @Effect({
    dispatch: false
  })
  addMethod$ = this.actions$.pipe(
    ofType(PlayActionTypes.ADD_METHOD),
    tap((action: any) => {
      alert(`oh yeah ${action.payload.name}`);
    })
  );

  constructor(
    private actions$: Actions
  ) // private dataPersistence: DataPersistence<PlayPartialState>
  {}
}
