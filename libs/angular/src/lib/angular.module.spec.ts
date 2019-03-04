import { async, TestBed } from '@angular/core/testing';
import { AngularModule } from './angular.module';

describe('AngularModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularModule).toBeDefined();
  });
});
