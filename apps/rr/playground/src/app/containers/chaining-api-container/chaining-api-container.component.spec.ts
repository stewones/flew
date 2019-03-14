import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingApiContainerComponent } from './chaining-api-container.component';

describe('ChainingApiContainerComponent', () => {
  let component: ChainingApiContainerComponent;
  let fixture: ComponentFixture<ChainingApiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainingApiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainingApiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
