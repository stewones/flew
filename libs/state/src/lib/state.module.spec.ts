import { async, TestBed } from '@angular/core/testing';
import { ReactiveStateModule } from './state.module';

describe('ReactiveStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ReactiveStateModule).toBeDefined();
  });
});
