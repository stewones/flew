import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { dispatch, getState, connect } from '@reative/state';
import { getTodo } from '../../actions/getTodo';
import { Todo } from '../../interfaces/todo';
import { saveTodo } from '../../actions/saveTodo';
@Component({
  selector: 'reative-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent implements OnInit {
  @Input() id: string;

  view$ = connect<Todo>('todo.view');

  constructor() {}

  ngOnInit() {
    this.load();
  }

  load() {
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
    dispatch(saveTodo(todo));
  }
}
