import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionLogContainerComponent } from './collection-log-container.component';

describe('CollectionLogContainerComponent', () => {
  let component: CollectionLogContainerComponent;
  let fixture: ComponentFixture<CollectionLogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionLogContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionLogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
