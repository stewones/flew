import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingContainerComponent } from './testing-container.component';

describe('TestingContainerComponent', () => {
  let component: TestingContainerComponent;
  let fixture: ComponentFixture<TestingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
