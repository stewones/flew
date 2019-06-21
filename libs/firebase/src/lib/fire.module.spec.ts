import { async, TestBed } from '@angular/core/testing';
import { ReactiveFirebaseModule } from './fire.module';

describe('ReactiveFirebaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFirebaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ReactiveFirebaseModule).toBeDefined();
  });
});
