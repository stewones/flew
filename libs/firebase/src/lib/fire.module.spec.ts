import { async, TestBed } from '@angular/core/testing';
import { FireModule } from './fire.module';

describe('FireModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FireModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FireModule).toBeDefined();
  });
});
