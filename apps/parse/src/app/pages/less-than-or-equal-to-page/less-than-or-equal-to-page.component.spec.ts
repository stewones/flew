import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanOrEqualToPageComponent } from './less-than-or-equal-to-page.component';

describe('LessThanOrEqualToPageComponent', () => {
  let component: LessThanOrEqualToPageComponent;
  let fixture: ComponentFixture<LessThanOrEqualToPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanOrEqualToPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanOrEqualToPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
