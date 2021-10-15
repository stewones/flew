import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionResponseContainerComponent } from './collection-response-container.component';

describe('CollectionResponseContainerComponent', () => {
  let component: CollectionResponseContainerComponent;
  let fixture: ComponentFixture<CollectionResponseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionResponseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionResponseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
