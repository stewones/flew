import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldBooleanComponent } from './field-boolean.component';

describe('FieldBooleanComponent', () => {
  let component: FieldBooleanComponent;
  let fixture: ComponentFixture<FieldBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
