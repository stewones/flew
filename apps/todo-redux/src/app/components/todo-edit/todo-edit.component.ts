import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { guid } from '@reative/core';
import { dispatch, getState, connect } from '@reative/state';
import { getTodo } from '../../actions/getTodo';
import { Todo } from '../../interfaces/todo';
import { saveTodo } from '../../actions/saveTodo';
import { addTodoView } from '../../actions/addTodoView';
import { createTodo } from '../../actions/createTodo';

@Component({
  selector: 'reative-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent implements OnInit {
  @Input() id: string;

  todo = {} as Todo;
  view$ = connect<Todo>('todo.view', { mutable: true }); // mutable is meant for not changing redux state while performing form actions (ngModel)

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
        useMemo: getState('control.useMemo'),
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
}
