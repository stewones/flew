import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { MethodsEffects } from './methods.effects';
import { LoadMethods, MethodsLoaded } from './methods.actions';

describe('MethodsEffects', () => {
  let actions: Observable<any>;
  let effects: MethodsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        MethodsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(MethodsEffects);
  });

  describe('loadMethods$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadMethods() });
      expect(effects.loadMethods$).toBeObservable(
        hot('-a-|', { a: new MethodsLoaded([]) })
      );
    });
  });
});
