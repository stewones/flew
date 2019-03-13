import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { PlayEffects } from './play.effects';
import { LoadPlay, PlayLoaded } from './play.actions';

describe('PlayEffects', () => {
  let actions: Observable<any>;
  let effects: PlayEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        PlayEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(PlayEffects);
  });

  describe('loadPlay$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadPlay() });
      expect(effects.loadPlay$).toBeObservable(
        hot('-a-|', { a: new PlayLoaded([]) })
      );
    });
  });
});
