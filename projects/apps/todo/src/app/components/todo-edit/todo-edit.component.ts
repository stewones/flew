import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { guid } from '@rebased/core';
import { dispatch, getState, connect } from '@rebased/state';
import { getTodo } from '../../actions/getTodo';
import { Todo } from '../../interfaces/todo';
import { saveTodo } from '../../actions/saveTodo';
import { addTodoView } from '../../actions/addTodoView';
import { createTodo } from '../../actions/createTodo';
import { removeTodo } from '../../actions/removeTodo';

@Component({
  selector: 'rebased-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent implements OnInit {
  @Input() id: string;

  // mutable option is meant for not changing redux state. ie: while performing form actions (ngModel)
  view$ = connect<Todo>('todo.view', { mutable: true });

  constructor() {}

  ngOnInit() {
    this.load();
  }

  load() {
    // new todo
    if (!this.id) {
      dispatch(
        addTodoView({
          doc_id: guid(2)
        })
      );
      return;
    }
    // existing todo
    dispatch(
      getTodo(this.id, {
        useState: getState('control.useState'),
        useCache: getState('control.useCache'),
        useNetwork: getState('control.useNetwork'),
        driver: getState('control.driver'),
        pathname: getState('control.pathname')
      })
    );
  }

  save(todo: Todo) {
    if (this.id) {
      dispatch(saveTodo(todo));
    } else {
      dispatch(createTodo(todo));
    }
  }

  delete(todo: Todo) {
    dispatch(removeTodo(todo));
  }
}
