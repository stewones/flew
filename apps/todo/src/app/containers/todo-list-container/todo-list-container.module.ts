import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListContainerComponent } from './todo-list-container.component';
import { TodoHeaderModule } from '../../components/todo-header/todo-header.module';
import { TodoContentModule } from '../../components/todo-content/todo-content.module';
import { TodoFooterModule } from '../../components/todo-footer/todo-footer.module';

@NgModule({
  declarations: [TodoListContainerComponent],
  imports: [
    CommonModule,
    TodoHeaderModule,
    TodoContentModule,
    TodoFooterModule
  ],
  exports: [TodoListContainerComponent]
})
export class TodoListContainerModule {}
