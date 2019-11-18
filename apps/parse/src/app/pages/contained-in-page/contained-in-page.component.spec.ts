import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainedInPageComponent } from './contained-in-page.component';

describe('ContainedInPageComponent', () => {
  let component: ContainedInPageComponent;
  let fixture: ComponentFixture<ContainedInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainedInPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainedInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
