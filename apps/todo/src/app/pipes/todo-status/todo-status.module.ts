import { NgModule } from '@angular/core';
import { TodoStatusPipe } from './todo-status.pipe';
@NgModule({
  declarations: [TodoStatusPipe],
  imports: [],
  exports: [TodoStatusPipe]
})
export class TodoStatusPipeModule {}
