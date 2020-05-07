import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditPageComponent } from './edit-page.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditPageComponent
  }
];

@NgModule({
  declarations: [EditPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [EditPageComponent]
})
export class EditPageModule {}
