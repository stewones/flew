import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReativeDriverOption } from '@reative/core';
import { connect, dispatch, getState } from '@reative/state';
import { THE_CAT_API_SEARCH } from '../../configs/cat';
import { Todo } from '../../interfaces/todo';
import { getTodos } from '../../actions/getTodos';
import { navigateTo } from '../../actions/navigateTo';
import { useMemo } from '../../actions/useMemo';
import { useCache } from '../../actions/useCache';
import { useNetwork } from '../../actions/useNetwork';
import { setDriver } from '../../actions/setDriver';
import { setPathname } from '../../actions/setPathname';

@Component({
  selector: 'reative-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  loading$ = connect<boolean>('todo.loading');
  error$ = connect<boolean>('todo.error');
  todos$ = connect<Todo[]>('todo.list');

  useMemo$ = connect<boolean>('control.useMemo');
  useCache$ = connect<boolean>('control.useCache');
  useNetwork$ = connect<boolean>('control.useNetwork');
  simulateError$ = connect<boolean>('control.simulateError');

  driver$ = connect<ReativeDriverOption>('control.driver');
  drivers = ['firestore', 'firebase', 'http', 'parse'];

  constructor() {}

  ngOnInit() {
    dispatch(
      getTodos({
        useMemo: getState('control.useMemo'),
        useCache: getState('control.useCache'),
        useNetwork: getState('control.useNetwork'),
        driver: getState('control.driver'),
        pathname: getState('control.pathname')
      })
    );
  }

  reload() {
    dispatch(
      getTodos({
        useMemo: getState('control.useMemo'),
        useCache: getState('control.useCache'),
        useNetwork: getState('control.useNetwork'),
        driver: getState('control.driver'),
        pathname: getState('control.pathname')
      })
    );
  }

  edit(todoID) {
    dispatch(navigateTo(`/edit/${todoID}`));
  }

  changeDriver($event) {
    dispatch(setDriver($event.target.value));
  }

  changeUseMemo($event) {
    dispatch(useMemo($event.target.checked));
  }

  changeUseCache($event) {
    dispatch(useCache($event.target.checked));
  }

  changeUseNetwork($event) {
    dispatch(useNetwork($event.target.checked));
  }

  simulateHttpError($event) {
    const isChecked = $event.target.checked;
    if (isChecked) {
      dispatch(setDriver('http'));
      dispatch(setPathname('/some-weird-path'));
    } else {
      dispatch(setDriver('firestore'));
      dispatch(setPathname(THE_CAT_API_SEARCH));
    }
  }
}
