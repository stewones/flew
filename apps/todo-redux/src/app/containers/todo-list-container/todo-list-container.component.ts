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
import { ReativeDriverOption } from '../../../../../../libs/core/src';

const THE_CAT_API_SEARCH = '/images/search?limit=5';
@Component({
  selector: 'todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  loading$ = connect<boolean>('todo.loading');
  error$ = connect<boolean>('todo.error');
  todos$ = connect<Todo[]>('todo.list');

  driver: ReativeDriverOption = 'firestore';
  drivers = ['firestore', 'firebase', 'http', 'parse'];

  useMemo = true;
  useCache = true;
  useNetwork = true;
  useError = false;

  pathname = THE_CAT_API_SEARCH; // for http driver

  constructor(protected detector: ChangeDetectorRef) {}

  ngOnInit() {
    dispatch(
      getTodos({
        useMemo: this.useMemo,
        useCache: this.useCache,
        useNetwork: this.useNetwork,
        driver: this.driver,
        pathname: this.pathname
      })
    );
  }

  reload() {
    dispatch(
      getTodos({
        useMemo: this.useMemo,
        useCache: this.useCache,
        useNetwork: this.useNetwork,
        driver: this.driver,
        pathname: this.pathname
      })
    );
  }

  edit(todoID) {
    dispatch(navigateTo(`/edit/${todoID}`));
  }

  simulateHttpError($event) {
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.driver = 'http';
      this.pathname = '/some-weird-path';
    } else {
      this.driver = 'firestore';
      this.pathname = THE_CAT_API_SEARCH;
    }
  }
}
