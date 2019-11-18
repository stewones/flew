import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreaterThanPageComponent } from './greater-than-page.component';

describe('GreaterThanPageComponent', () => {
  let component: GreaterThanPageComponent;
  let fixture: ComponentFixture<GreaterThanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreaterThanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreaterThanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
