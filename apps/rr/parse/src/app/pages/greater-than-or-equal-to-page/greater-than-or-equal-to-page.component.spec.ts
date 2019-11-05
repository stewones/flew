import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreaterThanOrEqualToPageComponent } from './greater-than-or-equal-to-page.component';

describe('GreaterThanOrEqualToPageComponent', () => {
  let component: GreaterThanOrEqualToPageComponent;
  let fixture: ComponentFixture<GreaterThanOrEqualToPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreaterThanOrEqualToPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreaterThanOrEqualToPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
