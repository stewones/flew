import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionChooserContainerComponent } from './collection-chooser-container.component';

describe('CollectionChooserContainerComponent', () => {
  let component: CollectionChooserContainerComponent;
  let fixture: ComponentFixture<CollectionChooserContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionChooserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionChooserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
