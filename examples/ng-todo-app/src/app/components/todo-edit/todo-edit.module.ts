import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoEditComponent } from './todo-edit.component';

@NgModule({
  declarations: [TodoEditComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TodoEditComponent]
})
export class TodoEditModule {}
