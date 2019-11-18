import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EqualToPageComponent } from './equal-to-page.component';

const routes: Routes = [
  {
    path: '',
    component: EqualToPageComponent
  }
];

@NgModule({
  declarations: [EqualToPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [EqualToPageComponent]
})
export class EqualToPageModule { }