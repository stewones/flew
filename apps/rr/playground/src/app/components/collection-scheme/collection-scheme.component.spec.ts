import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSchemeComponent } from './collection-scheme.component';

describe('CollectionSchemeComponent', () => {
  let component: CollectionSchemeComponent;
  let fixture: ComponentFixture<CollectionSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
