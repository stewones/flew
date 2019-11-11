import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFooterComponent } from './todo-footer.component';

@NgModule({
  declarations: [TodoFooterComponent],
  imports: [CommonModule],
  exports: [TodoFooterComponent]
})
export class TodoFooterModule { }