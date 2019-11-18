import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LessThanOrEqualToPageComponent } from './less-than-or-equal-to-page.component';

const routes: Routes = [
  {
    path: '',
    component: LessThanOrEqualToPageComponent
  }
];

@NgModule({
  declarations: [LessThanOrEqualToPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [LessThanOrEqualToPageComponent]
})
export class LessThanOrEqualToPageModule { }