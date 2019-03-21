import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbChooserContainerComponent } from './verb-chooser-container.component';

describe('VerbChooserContainerComponent', () => {
  let component: VerbChooserContainerComponent;
  let fixture: ComponentFixture<VerbChooserContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbChooserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbChooserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
