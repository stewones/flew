import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionLogComponent } from './collection-log.component';

describe('CollectionLogComponent', () => {
  let component: CollectionLogComponent;
  let fixture: ComponentFixture<CollectionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
