import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { connect, dispatch } from '@reative/state';
import { Todo } from '../../interfaces/todo';
import { getTodos } from '../../actions/getTodos';
import { navigateTo } from '../../actions/navigateTo';

@Component({
  selector: 'todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  loading$ = connect<boolean>('todo.loading');
  todos$ = connect<Todo[]>('todo.list');

  useMemo = true;
  useCache = true;
  useNetwork = true;

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    dispatch(
      getTodos({
        useMemo: this.useMemo,
        useCache: this.useCache,
        useNetwork: this.useNetwork
      })
    );
  }

  reload() {
    dispatch(
      getTodos({
        useMemo: this.useMemo,
        useCache: this.useCache,
        useNetwork: this.useNetwork
      })
    );
  }

  edit(todoID) {
    dispatch(navigateTo(`/edit/${todoID}`));
  }
}
