import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListContainerComponent } from './todo-list-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TodoListContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [TodoListContainerComponent]
})
export class TodoListContainerModule {}
