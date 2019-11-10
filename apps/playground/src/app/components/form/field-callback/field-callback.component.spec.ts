import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCallbackComponent } from './field-callback.component';

describe('FieldCallbackComponent', () => {
  let component: FieldCallbackComponent;
  let fixture: ComponentFixture<FieldCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
