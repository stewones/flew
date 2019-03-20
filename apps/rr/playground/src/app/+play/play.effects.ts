import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { PlayActionTypes } from './play.actions';
import { withLatestFrom, map, tap } from 'rxjs/operators';
import { PlayState } from './play.reducer';
import { Store } from '@ngrx/store';
import { AppService } from '../services/app.service';

declare var window;
@Injectable()
export class PlayEffects {
  @Effect({
    dispatch: false
  })
  addResponse$ = this.actions$.pipe(
    ofType(PlayActionTypes.ADD_COLLECTION_RESPONSE),
    //
    // get latest responses
    withLatestFrom(
      this.store$.select((state: any) => state.play.responses),
      (action, responses) => {
        return { action: action, responses: responses };
      }
    ),
    //
    // apply the json tree view
    map((result: any) => {
      const index = result.responses.indexOf(result.action.payload) + 1;
      const key = `response-tree-${index}`;
      setTimeout(() => {
        window.jsonTreeViewer(key).parse(result.action.payload);
      }, 0);
    })
  );

  @Effect({
    dispatch: false
  })
  loadCachedResponse$ = this.actions$.pipe(
    ofType(PlayActionTypes.LOAD_COLLECTION_CACHED_RESPONSES),
    //
    // apply the json tree view
    tap(() => this.app.loadCachedResponse$.next())
  );

  @Effect({
    dispatch: false
  })
  clearCachedResponse$ = this.actions$.pipe(
    ofType(PlayActionTypes.CLEAR_COLLECTION_CACHED_RESPONSES),
    //
    // apply the json tree view
    tap(() => this.app.clearCachedResponse$.next())
  );

  constructor(
    private actions$: Actions,
    private store$: Store<PlayState>,
    private app: AppService
  ) {}
}
