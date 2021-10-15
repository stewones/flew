import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingApiComponent } from './chaining-api.component';

describe('ChainingApiComponent', () => {
  let component: ChainingApiComponent;
  let fixture: ComponentFixture<ChainingApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainingApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
