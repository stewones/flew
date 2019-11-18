import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSchemeContainerComponent } from './collection-scheme-container.component';

describe('CollectionSchemeContainerComponent', () => {
  let component: CollectionSchemeContainerComponent;
  let fixture: ComponentFixture<CollectionSchemeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionSchemeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSchemeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
