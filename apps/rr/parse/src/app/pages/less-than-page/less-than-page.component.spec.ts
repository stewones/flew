import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanPageComponent } from './less-than-page.component';

describe('LessThanPageComponent', () => {
  let component: LessThanPageComponent;
  let fixture: ComponentFixture<LessThanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
