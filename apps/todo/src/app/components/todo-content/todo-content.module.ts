import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoContentComponent } from './todo-content.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStatusPipeModule } from '../../pipes/todo-status/todo-status.module';

@NgModule({
  declarations: [TodoContentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoStatusPipeModule
  ],
  exports: [TodoContentComponent]
})
export class TodoContentModule {}
