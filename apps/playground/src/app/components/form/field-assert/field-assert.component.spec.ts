import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAssertComponent } from './field-assert.component';

describe('FieldAssertComponent', () => {
  let component: FieldAssertComponent;
  let fixture: ComponentFixture<FieldAssertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldAssertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAssertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
