import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoEditComponent } from './todo-edit.component';

@NgModule({
  declarations: [TodoEditComponent],
  imports: [CommonModule],
  exports: [TodoEditComponent]
})
export class TodoEditModule { }