import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListContainerComponent } from './todo-list-container.component';

describe('TodoListContainerComponent', () => {
  let component: TodoListContainerComponent;
  let fixture: ComponentFixture<TodoListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
