import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PlayState, PlayStateModel } from './play.state';

describe('Play state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([PlayState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(PlayState.getState);
        const expected: PlayStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
