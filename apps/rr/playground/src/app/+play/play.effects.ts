import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { PlayActionTypes } from './play.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class PlayEffects {
  // @Effect({
  //   dispatch: false
  // })
  // addMethod$ = this.actions$.pipe(
  //   ofType(PlayActionTypes.ADD_CHAIN_METHOD),
  //   tap((action: any) => {
  //     // alert(`oh yeah ${action.payload.name}`);
  //   })
  // );

  constructor(private actions$: Actions) {}
}
