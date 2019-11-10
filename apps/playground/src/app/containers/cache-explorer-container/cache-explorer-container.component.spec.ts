import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheExplorerContainerComponent } from './cache-explorer-container.component';

describe('CacheExplorerContainerComponent', () => {
  let component: CacheExplorerContainerComponent;
  let fixture: ComponentFixture<CacheExplorerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheExplorerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheExplorerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
