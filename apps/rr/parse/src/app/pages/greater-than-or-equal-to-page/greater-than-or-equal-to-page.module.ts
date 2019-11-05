import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GreaterThanOrEqualToPageComponent } from './greater-than-or-equal-to-page.component';

const routes: Routes = [
  {
    path: '',
    component: GreaterThanOrEqualToPageComponent
  }
];

@NgModule({
  declarations: [GreaterThanOrEqualToPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [GreaterThanOrEqualToPageComponent]
})
export class GreaterThanOrEqualToPageModule { }