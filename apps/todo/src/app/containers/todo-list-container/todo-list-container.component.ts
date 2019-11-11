import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';
import { select } from '@reative/state';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListContainerComponent implements OnInit {
  todos$: Observable<Todo[]> = select<Todo[]>(`todo-list`);
  filter: string;
  busy: boolean = false;

  constructor(
    protected detector: ChangeDetectorRef,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoService.find().subscribe();
  }
}
