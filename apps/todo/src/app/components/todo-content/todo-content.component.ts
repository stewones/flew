import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Plugins } from '@capacitor/core';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { Todo, TodoService } from '../../services/todo.service';

import { getState, setState } from '@reative/state';

const { Keyboard } = Plugins;

@Component({
  selector: 'todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoContentComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Input() filter: string;
  editing: boolean[] = [];

  constructor(
    protected detector: ChangeDetectorRef,
    public loading: LoadingController,
    public toast: ToastController,
    private todoService: TodoService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  remove(id: string) {
    //
    // remove from db
    this.todoService.remove(id).catch(console.log);
    //
    // remove from state+cache
    const currentState = getState(`todo-list`, { raw: true, mutable: true });
    currentState.data = currentState.data.filter(it => it.id !== id);
    setState(`todo-list`, currentState, { merge: false });
  }

  async save(todo: any, notify?: boolean) {
    this.editing = []; // reset editing state
    this.keyboardClose();
    this.todoService
      .save(todo)
      .toPromise()
      .catch(e => console.error(e));
    let toast = await this.toast.create({
      message: 'Todo created',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  edit(todo, i: number) {
    this.editing[i] = true;
  }

  doneEditing(i: number) {
    this.editing[i] = false;
    this.keyboardClose();
  }

  eventHandler(e: any, i: number) {
    // esc pressed
    if (e.keyCode === 27) {
      this.editing[i] = false;
    }

    // enter pressed
    if (e.keyCode === 13) {
      this.save(this.todos[i], true);
    }
  }

  markAll(checked): void {
    this.todos.forEach(todo => {
      todo.done = checked;
      this.save(todo);
    });
  }

  keyboardClose() {
    if (this.platform.is(`capacitor`)) Keyboard.hide();
  }
}
