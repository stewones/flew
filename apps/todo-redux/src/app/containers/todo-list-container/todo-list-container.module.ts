import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListContainerComponent } from './todo-list-container.component';

@NgModule({
  declarations: [TodoListContainerComponent],
  imports: [CommonModule],
  exports: [TodoListContainerComponent]
})
export class TodoListContainerModule { }