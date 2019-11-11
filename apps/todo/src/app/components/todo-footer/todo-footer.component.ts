import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { TodoService, Todo } from '../../services/todo.service';

@Component({
  selector: 'todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFooterComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Input() filter: string;
  @Output() filterChange = new EventEmitter();

  constructor(
    protected detector: ChangeDetectorRef,
    private todoService: TodoService
  ) {}

  ngOnInit() {}

  clearCompleted() {
    let completed = this.todos.filter(item => item.done);
    completed.forEach(item => {
      this.todoService.remove(item.id);
    });
  }

  completed() {
    return this.todos && (this.todos.filter(item => item.done) || []).length;
  }

  left() {
    return this.todos && (this.todos.filter(item => !item.done) || []).length;
  }

  filterBy(type) {
    this.filter = type;
    this.filterChange.emit(type);
  }
}
