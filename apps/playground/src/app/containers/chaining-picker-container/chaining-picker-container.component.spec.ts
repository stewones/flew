import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingPickerContainerComponent } from './chaining-picker-container.component';

describe('ChainingPickerContainerComponent', () => {
  let component: ChainingPickerContainerComponent;
  let fixture: ComponentFixture<ChainingPickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainingPickerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainingPickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
