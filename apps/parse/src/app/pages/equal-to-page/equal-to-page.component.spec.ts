import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualToPageComponent } from './equal-to-page.component';

describe('EqualToPageComponent', () => {
  let component: EqualToPageComponent;
  let fixture: ComponentFixture<EqualToPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualToPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualToPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
