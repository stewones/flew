import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { connect, dispatch } from '@reative/state';
import { Todo } from '../../interfaces/todo';
import { getTodos } from '../../actions/getTodos';

@Component({
  selector: 'todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  todos$ = connect<Todo[]>('todo.list');

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    dispatch(getTodos());
  }
}
