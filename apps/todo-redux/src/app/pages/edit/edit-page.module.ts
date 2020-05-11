import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditPageComponent } from './edit-page.component';
import { TodoEditModule } from '../../components/todo-edit/todo-edit.module';

const routes: Routes = [
  {
    path: 'edit',
    component: EditPageComponent
  },
  {
    path: 'edit/:id',
    component: EditPageComponent
  }
];

@NgModule({
  declarations: [EditPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TodoEditModule],
  exports: [EditPageComponent]
})
export class EditPageModule {}
