import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoHeaderComponent } from './todo-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoHeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [TodoHeaderComponent]
})
export class TodoHeaderModule {}
