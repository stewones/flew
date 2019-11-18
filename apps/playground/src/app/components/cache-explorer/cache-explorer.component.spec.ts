import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheExplorerComponent } from './cache-explorer.component';

describe('CacheExplorerComponent', () => {
  let component: CacheExplorerComponent;
  let fixture: ComponentFixture<CacheExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CacheExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
