import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingPickerComponent } from './chaining-picker.component';

describe('ChainingPickerComponent', () => {
  let component: ChainingPickerComponent;
  let fixture: ComponentFixture<ChainingPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainingPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainingPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
