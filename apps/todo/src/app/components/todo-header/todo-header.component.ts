import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { setState, getState } from '@reative/state';

@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoHeaderComponent implements OnInit {
  todoText: string;

  constructor(
    protected detector: ChangeDetectorRef,
    private todoService: TodoService
  ) {}

  ngOnInit() {}

  addTodo() {
    this.todoService.create(this.todoText).subscribe(todo => {
      const currentState = getState(`todo-list`, { raw: true, mutable: true });
      currentState.data.unshift(todo);
      setState(`todo-list`, currentState, { merge: false });
      this.todoText = null;
      console.log(`${todo.id} created`);
    });
  }
}
